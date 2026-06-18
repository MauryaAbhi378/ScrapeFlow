/**
 * Type definitions for the Billing page
 */

export type CreditPack = {
  id: "small" | "medium" | "large";
  label: string;
  credits: number;
  price: number;
  priceId: string;
};

export type DailyUsage = {
  date: string; // e.g. "Jun 1", "Jun 2"
  successful: number; // Credits consumed by successful phases
  failed: number; // Credits consumed by failed phases
};

export type StripeCheckoutResponse = {
  url: string;
};

export type UserBalance = {
  userId: string;
  credits: number;
};
