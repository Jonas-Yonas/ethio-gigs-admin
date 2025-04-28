import { User } from "next-auth";

interface DashboardHeaderProps {
  title: string;
  user?: User;
}

export default function DashboardHeader({ title, user }: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
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
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-medium">
            {user?.name?.charAt(0) || "A"}
          </div>
          <span className="text-sm font-medium">{user?.name || "Admin"}</span>
        </div>
      </div>
    </div>
  );
}
