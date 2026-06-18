"use client";

import { GetAvailableCredits } from "@/actions/billing/getAvaliableCredits";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CoinsIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import ReactCountUpWrapper from "./ReactCountUpWrapper";
import { buttonVariants } from "./ui/button";

export default function UserAvailableCreditsBadge() {
  const query = useQuery({
    queryKey: ["user-available-credits"],
    queryFn: async () => {
      console.log("[UserAvailableCreditsBadge] 📊 Fetching available credits...");
      const credits = await GetAvailableCredits();
      console.log("[UserAvailableCreditsBadge] ✅ Credits fetched:", credits);
      return credits;
    },
    staleTime: 5 * 1000, // 5 seconds - marks data as stale after 5 seconds
    refetchInterval: 10 * 1000, // Refetch every 10 seconds
    refetchOnMount: true, // Always refetch on component mount
    refetchOnWindowFocus: true, // Refetch when window regains focus
  });

  // Log query status for debugging
  console.log("[UserAvailableCreditsBadge] 📋 Query status:", {
    isLoading: query.isLoading,
    isStale: query.isStale,
    data: query.data,
    error: query.error?.message,
  });
  return (
    <Link
      href={"/billing"}
      className={cn(
        "w-full space-x-2 items-center",
        buttonVariants({ variant: "outline" }),
      )}
    >
      <CoinsIcon size={20} className="text-emerald-500" />
      <span className="font-semibold capitalize">
        {query.isLoading && <Loader2Icon className="w-4 h-4 animate-spin" />}
        {!query.isLoading && query.data && (
          <ReactCountUpWrapper value={query.data} />
        )}
        {!query.isLoading && query.data === undefined && "-"}
      </span>
    </Link>
  );
}
