"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetAvailableCredits() {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [GetAvailableCredits] 🔍 Fetching available credits...`);
  
  const { userId } = await auth();
  console.log(`[${timestamp}] [GetAvailableCredits] 👤 Current user ID:`, userId);

  if (!userId) {
    console.error(`[${timestamp}] [GetAvailableCredits] ❌ User not authenticated`);
    throw new Error("Unauthenticated");
  }

  try {
    const balance = await prisma.userBalance.findUnique({
      where: { userId },
    });

    if (!balance) {
      console.log(`[${timestamp}] [GetAvailableCredits] ⚠️ No balance found for user ${userId}, returning 0`);
      return 0;
    }

    console.log(`[${timestamp}] [GetAvailableCredits] ✅ Balance found for user ${userId}:`, balance.credits, "credits");
    return balance.credits;
  } catch (error) {
    console.error(`[${timestamp}] [GetAvailableCredits] ❌ Error fetching balance:`, error instanceof Error ? error.message : error);
    throw error;
  }
}
