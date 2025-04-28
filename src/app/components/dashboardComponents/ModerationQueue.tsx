import Link from "next/link";

interface ModerationItem {
  id: string;
  title: string;
  category: string;
  submitted: string;
}

export default function ModerationQueue() {
  // Sample data - replace with your actual data source
  const queueItems: ModerationItem[] = [
    {
      id: "1",
      title: "E-commerce Website",
      category: "Web Development",
      submitted: "2 hours ago",
    },
    {
      id: "2",
      title: "Company Logo Redesign",
      category: "Graphic Design",
      submitted: "5 hours ago",
    },
    {
      id: "3",
      title: "Blog Articles (10)",
      category: "Content Writing",
      submitted: "1 day ago",
    },
    {
      id: "4",
      title: "Social Media Campaign",
      category: "Marketing",
      submitted: "1 day ago",
    },
  ];

  return (
    <div className="space-y-4">
      {queueItems.map((item) => (
        <div
          key={item.id}
          className="flex items-start justify-between p-3 hover:bg-gray-50 rounded-lg transition"
        >
          <div>
            <Link
              href={`/admin/gigs/${item.id}/moderate`}
              className="font-medium text-gray-900 hover:text-violet-600"
            >
              {item.title}
            </Link>
            <p className="text-sm text-gray-500">{item.category}</p>
            <p className="text-xs text-gray-400 mt-1">{item.submitted}</p>
          </div>
          <div className="flex space-x-2">
            <button className="text-green-600 hover:text-green-800 p-1">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
            <button className="text-red-600 hover:text-red-800 p-1">
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
      {queueItems.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          No items awaiting moderation
        </p>
      )}
      <div className="pt-2 border-t border-gray-200">
        <Link
          href="/admin/moderation"
          className="text-sm font-medium text-violet-600 hover:text-violet-700"
        >
          View full queue →
        </Link>
      </div>
    </div>
  );
}
