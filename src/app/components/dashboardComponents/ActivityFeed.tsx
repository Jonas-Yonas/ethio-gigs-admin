import Link from "next/link";

interface ActivityItem {
  id: string;
  action: string;
  user: string;
  time: string;
  gigTitle?: string;
}

export default function ActivityFeed() {
  // Sample data - replace with your actual data source
  const activities: ActivityItem[] = [
    {
      id: "1",
      action: "approved",
      user: "Admin User",
      time: "10 minutes ago",
      gigTitle: "Mobile App Design",
    },
    {
      id: "2",
      action: "rejected",
      user: "Auto-Mod",
      time: "1 hour ago",
      gigTitle: "SEO Services",
    },
    {
      id: "3",
      action: "edited",
      user: "Admin User",
      time: "2 hours ago",
      gigTitle: "WordPress Website",
    },
    {
      id: "4",
      action: "created",
      user: "New User",
      time: "5 hours ago",
      gigTitle: "Social Media Graphics",
    },
  ];

  const getActionColor = (action: string) => {
    switch (action) {
      case "approved":
        return "text-green-600 bg-green-50";
      case "rejected":
        return "text-red-600 bg-red-50";
      case "edited":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "approved":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case "rejected":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      case "edited":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        );
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3">
          <div
            className={`flex-shrink-0 p-1 rounded-full ${getActionColor(
              activity.action
            )}`}
          >
            {getActionIcon(activity.action)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-800">
              <span className="font-medium">{activity.user}</span>{" "}
              {activity.action}{" "}
              {activity.gigTitle && (
                <Link
                  href="#"
                  className="font-medium text-violet-600 hover:text-violet-700"
                >
                  {activity.gigTitle}
                </Link>
              )}
            </p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
        </div>
      ))}
      {activities.length === 0 && (
        <p className="text-center text-gray-500 py-4">No recent activity</p>
      )}
      <div className="pt-2 border-t border-gray-200">
        <Link
          href="/admin/activity"
          className="text-sm font-medium text-violet-600 hover:text-violet-700"
        >
          View all activity →
        </Link>
      </div>
    </div>
  );
}
