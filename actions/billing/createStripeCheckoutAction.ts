"use server";

import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-06-24.dahlia",
});

export async function createStripeCheckoutAction(priceId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  if (!priceId) {
    throw new Error("Price ID is required");
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?canceled=true`,
      metadata: {
        userId,
      },
    });

    if (!session.url) {
      throw new Error("Failed to create checkout session");
    }

    return { url: session.url };
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    throw new Error("Failed to create checkout session");
  }
}
