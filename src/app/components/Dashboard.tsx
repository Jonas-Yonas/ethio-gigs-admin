"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RecentGigsTable from "./dashboardComponents/RecentGigsTable";
import StatsCards from "./dashboardComponents/StatsCards";
import ModerationQueue from "./dashboardComponents/ModerationQueue";
import ActivityFeed from "./dashboardComponents/ActivityFeed";
import Spinner from "./Spinner";
import Link from "next/link";
import CollapsibleSidebar from "./CollapsibleSidebar";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Load sidebar state from localStorage
    const savedState = localStorage.getItem("sidebarCollapsed");
    if (savedState) {
      setIsCollapsed(savedState === "true");
    }

    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", String(newState));
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row">
        <CollapsibleSidebar
          user={session?.user}
          isCollapsed={isCollapsed}
          toggleSidebar={toggleSidebar}
        />

        {/* Main Content - Add transition to match sidebar */}
        <div className={`flex-1 p-6 transition-all duration-300 ease-in-out`}>
          <StatsCards />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
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

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Moderation Queue
                </h2>
                <ModerationQueue />
              </div>

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
  );
}
