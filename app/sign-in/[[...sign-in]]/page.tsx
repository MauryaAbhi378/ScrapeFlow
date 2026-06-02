import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <div className="flex w-full max-w-5xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-md space-y-4">
          <Logo />
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">
              Welcome back
            </p>
            <h1 className="text-4xl font-semibold text-foreground">
              Sign in to keep your scraping workflows moving.
            </h1>
            <p className="text-muted-foreground">
              Use your Clerk account to access the dashboard, credentials, and billing areas.
            </p>
          </div>
          <Button asChild variant="outline" className="w-fit">
            <Link href="/sign-up">Create an account</Link>
          </Button>
        </div>
        <SignIn />
      </div>
    </div>
  );
}
