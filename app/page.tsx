import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LandingPage from "@/components/LandingPage";

export default async function Home() {
  const { userId } = await auth();
  
  // If user is logged in, redirect to home
  if (userId) {
    redirect("/home");
  }

  return <LandingPage />;
}
