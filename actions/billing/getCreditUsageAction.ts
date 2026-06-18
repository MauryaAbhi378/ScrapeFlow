"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";

export type DailyUsage = {
  date: string;
  successful: number;
  failed: number;
};

export async function getCreditUsageAction(): Promise<DailyUsage[]> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);

  // Get all execution phases for the current user in the current month
  const phases = await prisma.executionPhase.findMany({
    where: {
      userId,
      completedAt: {
        gte: start,
        lte: end,
      },
    },
    select: {
      completedAt: true,
      creditsCost: true,
      status: true,
    },
    orderBy: {
      completedAt: "asc",
    },
  });

  // Create a map for each day of the month
  const days = eachDayOfInterval({ start, end });
  const usageMap = new Map<string, { successful: number; failed: number }>();

  // Initialize all days with zero values
  days.forEach((day) => {
    const dateKey = format(day, "MMM d");
    usageMap.set(dateKey, { successful: 0, failed: 0 });
  });

  // Populate with actual data
  phases.forEach((phase) => {
    if (!phase.completedAt || !phase.creditsCost) return;

    const dateKey = format(phase.completedAt, "MMM d");
    const current = usageMap.get(dateKey);

    if (current) {
      if (phase.status === "COMPLETED") {
        current.successful += phase.creditsCost;
      } else if (phase.status === "FAILED") {
        current.failed += phase.creditsCost;
      }
    }
  });

  // Convert map to array
  const result: DailyUsage[] = Array.from(usageMap.entries()).map(
    ([date, usage]) => ({
      date,
      successful: usage.successful,
      failed: usage.failed,
    })
  );

  return result;
}
