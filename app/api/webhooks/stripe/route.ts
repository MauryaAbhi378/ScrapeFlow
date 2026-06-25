import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-06-24.dahlia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Credit amounts for each pack - must match the prices created in Stripe
const CREDIT_AMOUNTS: Record<number, number> = {
  999: 1_000, // $9.99 = Small Pack = 1,000 credits
  3999: 5_000, // $39.99 = Medium Pack = 5,000 credits
  6999: 10_000, // $69.99 = Large Pack = 10,000 credits
};

// Helper function to determine credits from line items
function getCreditsFromLineItems(lineItems: Stripe.LineItem[]): number {
  // Try to match by price from the first line item
  const firstItem = lineItems[0];
  if (!firstItem?.price?.unit_amount) return 0;

  const amount = firstItem.price.unit_amount;
  return CREDIT_AMOUNTS[amount] || 0;
}

export async function POST(req: NextRequest) {
  console.log("[Webhook] Received Stripe webhook");

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    console.error("[Webhook] Missing stripe-signature header");
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    console.log(`[Webhook] Event type: ${event.type}`);
  } catch (err) {
    console.error("[Webhook] Signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log("[Webhook] Processing checkout.session.completed");
    console.log("[Webhook] Session ID:", session.id);
    console.log("[Webhook] Metadata:", session.metadata);
    console.log("[Webhook] Amount total:", session.amount_total);

    const userId = session.metadata?.userId;
    const amountTotal = session.amount_total; // in cents

    if (!userId) {
      console.error("[Webhook] Missing userId in session metadata");
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    if (!amountTotal) {
      console.error("[Webhook] Missing amountTotal");
      return NextResponse.json(
        { error: "Missing amountTotal" },
        { status: 400 }
      );
    }

    // Get the credit amount based on the price
    let creditsToAdd = CREDIT_AMOUNTS[amountTotal];

    // Fallback: Try to get credits from line items if amount mapping fails
    if (!creditsToAdd) {
      console.log(
        "[Webhook] Amount not found in CREDIT_AMOUNTS, trying line items..."
      );
      try {
        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id
        );
        creditsToAdd = getCreditsFromLineItems(lineItems.data);
        console.log(
          "[Webhook] Credits from line items:",
          creditsToAdd
        );
      } catch (err) {
        console.error("[Webhook] Failed to fetch line items:", err);
      }
    }

    if (!creditsToAdd) {
      console.error(
        `[Webhook] Unknown amount: ${amountTotal}. Cannot determine credits to add.`
      );
      console.error(
        `[Webhook] Available amounts:`,
        Object.keys(CREDIT_AMOUNTS)
      );
      return NextResponse.json(
        {
          error: "Unknown credit pack amount",
          amount: amountTotal,
          availableAmounts: Object.keys(CREDIT_AMOUNTS),
        },
        { status: 400 }
      );
    }

    try {
      console.log(
        `[Webhook] Attempting to add ${creditsToAdd} credits to user ${userId}`
      );

      // Update or create user balance
      const updatedBalance = await prisma.userBalance.upsert({
        where: { userId },
        update: {
          credits: {
            increment: creditsToAdd,
          },
        },
        create: {
          userId,
          credits: creditsToAdd,
        },
      });

      console.log(
        `[Webhook] ✅ Successfully added ${creditsToAdd} credits to user ${userId}`
      );
      console.log(
        `[Webhook] New balance: ${updatedBalance.credits} credits`
      );
      console.log(
        `[Webhook] Payment amount: $${amountTotal / 100}`
      );

      return NextResponse.json({
        received: true,
        creditsAdded: creditsToAdd,
        newBalance: updatedBalance.credits,
      });
    } catch (error) {
      console.error("[Webhook] ❌ Error updating user balance:", error);
      return NextResponse.json(
        { error: "Failed to update user balance" },
        { status: 500 }
      );
    }
  }

  console.log(`[Webhook] Event type ${event.type} - no action needed`);
  return NextResponse.json({ received: true });
}
