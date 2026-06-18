import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

/**
 * Manual credit addition endpoint (for testing/debugging)
 * WARNING: Remove or secure this endpoint in production!
 * 
 * Usage: POST /api/billing/add-credits
 * Body: { credits: number }
 */
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthenticated" },
        { status: 401 }
      );
    }

    const { credits } = await req.json();

    if (!credits || typeof credits !== "number" || credits <= 0) {
      return NextResponse.json(
        { error: "Invalid credits amount" },
        { status: 400 }
      );
    }

    // Update or create user balance
    const updatedBalance = await prisma.userBalance.upsert({
      where: { userId },
      update: {
        credits: {
          increment: credits,
        },
      },
      create: {
        userId,
        credits,
      },
    });

    console.log(
      `[Manual Credit Add] Added ${credits} credits to user ${userId}. New balance: ${updatedBalance.credits}`
    );

    return NextResponse.json({
      success: true,
      creditsAdded: credits,
      newBalance: updatedBalance.credits,
    });
  } catch (error) {
    console.error("[Manual Credit Add] Error:", error);
    return NextResponse.json(
      { error: "Failed to add credits" },
      { status: 500 }
    );
  }
}
