"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function BillingNotifications() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");

    if (success === "true") {
      toast.success("Payment successful! Your credits have been added.");
      // Clean up URL
      window.history.replaceState({}, "", "/billing");
    }

    if (canceled === "true") {
      toast.info("Payment was canceled. No charges were made.");
      // Clean up URL
      window.history.replaceState({}, "", "/billing");
    }
  }, [searchParams]);

  return null;
}
