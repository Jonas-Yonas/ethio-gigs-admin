import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LandingPageClient from "./components/LandingPageClient";

export default async function LandingPage() {
  const session = await auth();

  // Redirect to dashboard if authenticated
  if (session) {
    redirect("/dashboard");
  }

  return <LandingPageClient />;
}
