"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";

export type DailyExecutionStats = {
  date: string;
  success: number;
  failed: number;
};

export type ExecutionStats = {
  totalExecutions: number;
  totalPhaseExecutions: number;
  totalCreditsConsumed: number;
  dailyStats: DailyExecutionStats[];
};

export async function getWorkflowExecutionStatsAction(): Promise<ExecutionStats> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);

  // Get total workflow executions
  const totalExecutions = await prisma.workFlowExecution.count({
    where: { userId },
  });

  // Get total phase executions
  const totalPhaseExecutions = await prisma.executionPhase.count({
    where: { userId },
  });

  // Get total credits consumed
  const creditsResult = await prisma.workFlowExecution.aggregate({
    where: { userId },
    _sum: {
      creditsConsumed: true,
    },
  });

  const totalCreditsConsumed = creditsResult._sum.creditsConsumed ?? 0;

  // Get daily execution stats for the current month
  const executions = await prisma.workFlowExecution.findMany({
    where: {
      userId,
      completedAt: {
        gte: start,
        lte: end,
      },
    },
    select: {
      completedAt: true,
      status: true,
    },
    orderBy: {
      completedAt: "asc",
    },
  });

  // Create a map for each day of the month
  const days = eachDayOfInterval({ start, end });
  const statsMap = new Map<string, { success: number; failed: number }>();

  // Initialize all days with zero values
  days.forEach((day) => {
    const dateKey = format(day, "MMM d");
    statsMap.set(dateKey, { success: 0, failed: 0 });
  });

  // Populate with actual data
  executions.forEach((execution) => {
    if (!execution.completedAt) return;

    const dateKey = format(execution.completedAt, "MMM d");
    const current = statsMap.get(dateKey);

    if (current) {
      if (execution.status === "COMPLETED") {
        current.success += 1;
      } else if (execution.status === "FAILED") {
        current.failed += 1;
      }
    }
  });

  // Convert map to array
  const dailyStats: DailyExecutionStats[] = Array.from(statsMap.entries()).map(
    ([date, stats]) => ({
      date,
      success: stats.success,
      failed: stats.failed,
    })
  );

  return {
    totalExecutions,
    totalPhaseExecutions,
    totalCreditsConsumed,
    dailyStats,
  };
}
