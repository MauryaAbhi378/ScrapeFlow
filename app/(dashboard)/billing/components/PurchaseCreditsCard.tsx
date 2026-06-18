"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { createStripeCheckoutAction } from "@/actions/billing/createStripeCheckoutAction";
import { toast } from "sonner";

const CREDIT_PACKS = [
  {
    id: "small",
    label: "Small Pack",
    credits: 1_000,
    price: 9.99,
    priceId: process.env.NEXT_PUBLIC_STRIPE_SMALL_PACK_PRICE_ID || "",
  },
  {
    id: "medium",
    label: "Medium Pack",
    credits: 5_000,
    price: 39.99,
    priceId: process.env.NEXT_PUBLIC_STRIPE_MEDIUM_PACK_PRICE_ID || "",
  },
  {
    id: "large",
    label: "Large Pack",
    credits: 10_000,
    price: 69.99,
    priceId: process.env.NEXT_PUBLIC_STRIPE_LARGE_PACK_PRICE_ID || "",
  },
];

export default function PurchaseCreditsCard() {
  const [selectedPack, setSelectedPack] = useState("medium");
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    const pack = CREDIT_PACKS.find((p) => p.id === selectedPack);
    if (!pack || !pack.priceId) {
      toast.error("Invalid credit pack selected");
      return;
    }

    setIsLoading(true);
    try {
      const { url } = await createStripeCheckoutAction(pack.priceId);
      window.location.href = url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Failed to create checkout session. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-white">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
          <ShoppingCart className="w-4 h-4 text-green-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Purchase Credits</h2>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        Select the number of credits you want to purchase
      </p>

      <div className="space-y-3 mb-6">
        {CREDIT_PACKS.map((pack) => (
          <label
            key={pack.id}
            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
              selectedPack === pack.id
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-green-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="credit-pack"
                value={pack.id}
                checked={selectedPack === pack.id}
                onChange={(e) => setSelectedPack(e.target.value)}
                className="w-4 h-4 text-green-500 focus:ring-green-500"
              />
              <div>
                <p className="font-medium text-gray-900">
                  {pack.label} – {pack.credits.toLocaleString()} credits
                </p>
              </div>
            </div>
            <p className="font-semibold text-green-600">${pack.price}</p>
          </label>
        ))}
      </div>

      <button
        onClick={handlePurchase}
        disabled={isLoading}
        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            Purchase credits
          </>
        )}
      </button>
    </div>
  );
}
