"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <div className="text-7xl font-bold text-emerald-500 mb-4">404</div>

        <h1 className="text-4xl font-bold text-foreground mb-2">
          Page Not Found
        </h1>

        <p className="text-lg text-muted-foreground mb-8">
          Don&apos;t worry, even the best data sometimes gets lost in the
          <br />
          internet.
        </p>

        <Link href="/">
          <Button variant="emerald" size="lg" className="mb-8">
            <ArrowLeft className="mr-2" size={20} />
            Back to Dashboard
          </Button>
        </Link>

        <p className="text-sm text-muted-foreground">
          If you believe this is an error, please contact our support team.
        </p>
      </div>
    </div>
  );
}
