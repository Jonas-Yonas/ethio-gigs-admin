"use client";

import Link from "next/link";

export default function CollapsibleSidebar({
  user,
  isCollapsed,
  toggleSidebar,
}: {
  user?: { name?: string | null };
  isCollapsed: boolean;
  toggleSidebar: () => void;
}) {
  return (
    <div
      className={`bg-white border-r border-gray-200 lg:min-h-screen transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        {!isCollapsed && (
          <h1 className="text-sm text-gray-800">{user?.name}</h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-gray-100"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
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
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          ) : (
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
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          )}
        </button>
      </div>
      <nav className="p-4 space-y-2">
        <NavItem
          href="/admin/dashboard"
          icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          label="Dashboard"
          isCollapsed={isCollapsed}
          isActive={true}
        />
        <NavItem
          href="/admin/gigs"
          icon="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          label="Gigs Management"
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/admin/users"
          icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          label="User Management"
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/admin/settings"
          icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          label="Settings"
          isCollapsed={isCollapsed}
        />
      </nav>
    </div>
  );
}

function NavItem({
  href,
  icon,
  label,
  isCollapsed,
  isActive = false,
}: {
  href: string;
  icon: string;
  label: string;
  isCollapsed: boolean;
  isActive?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
        isActive
          ? "bg-violet-50 text-violet-700"
          : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      <svg
        className="w-5 h-5 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={icon}
        />
      </svg>
      {!isCollapsed && <span className="whitespace-nowrap">{label}</span>}
    </Link>
  );
}
