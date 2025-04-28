"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import DashboardHeader from "./dashboardComponents/DashboardHeader";
import RecentGigsTable from "./dashboardComponents/RecentGigsTable";
import StatsCards from "./dashboardComponents/StatsCards";
import ModerationQueue from "./dashboardComponents/ModerationQueue";
import ActivityFeed from "./dashboardComponents/ActivityFeed";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading... DASHBOARD page</p>;
  }

  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <h2>You logged in as: {session?.user?.name}</h2>
      <SignOutButton />
      {/* Your dashboard content */}

      <div className="min-h-screen bg-gray-50">
        {/* Dashboard Layout */}
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar - Would be a separate component */}
          <div className="w-full lg:w-64 bg-white border-r border-gray-200 lg:min-h-screen">
            <div className="p-4 border-b border-gray-200">
              <h1 className="text-xl font-bold text-violet-700">
                EthioGigs Admin
              </h1>
            </div>
            <nav className="p-4 space-y-2">
              <a
                href="/admin/dashboard"
                className="flex items-center space-x-2 p-2 rounded-lg bg-violet-50 text-violet-700"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>Dashboard</span>
              </a>
              <Link
                href="/admin/gigs"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 text-gray-700"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <span>Gigs Management</span>
              </Link>
              <a
                href="/admin/users"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 text-gray-700"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span>User Management</span>
              </a>
              <a
                href="/admin/settings"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 text-gray-700"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Settings</span>
              </a>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <DashboardHeader title="Admin Dashboard" user={session?.user} />

            {/* Stats Overview */}
            <StatsCards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              {/* Recent Gigs Table */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Recent Gigs
                    </h2>
                    <Link
                      href="/admin/gigs"
                      className="text-sm text-violet-600 hover:text-violet-700"
                    >
                      View All
                    </Link>
                  </div>
                  <RecentGigsTable />
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Moderation Queue */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Moderation Queue
                  </h2>
                  <ModerationQueue />
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Activity
                  </h2>
                  <ActivityFeed />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
