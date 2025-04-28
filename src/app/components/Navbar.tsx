"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import UserDropdown from "./UserDropdown";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Hide navbar on auth pages
  if (pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      <Link href="/" className="text-2xl font-bold text-violet-700">
        EthioGigs
      </Link>

      <div className="flex items-center space-x-4">
        {status === "loading" ? (
          <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
        ) : session ? (
          <UserDropdown user={session.user} />
        ) : (
          <>
            <Link
              href="/auth/signin"
              className="text-violet-700 font-semibold hover:underline"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition"
            >
              Get Started
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
