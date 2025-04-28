import Link from "next/link";

interface Gig {
  id: string;
  title: string;
  category: string;
  price: string;
  status: "approved" | "pending" | "rejected";
  createdAt: string;
}

export default function RecentGigsTable() {
  // In a real app, this would come from props or context
  const recentGigs: Gig[] = [
    {
      id: "1",
      title: "Website Development",
      category: "Web Development",
      price: "$500",
      status: "approved",
      createdAt: "2023-05-15",
    },
    {
      id: "2",
      title: "Logo Design",
      category: "Graphic Design",
      price: "$150",
      status: "pending",
      createdAt: "2023-05-14",
    },
    {
      id: "3",
      title: "Content Writing",
      category: "Writing",
      price: "$200",
      status: "approved",
      createdAt: "2023-05-13",
    },
    {
      id: "4",
      title: "Social Media Management",
      category: "Marketing",
      price: "$300",
      status: "rejected",
      createdAt: "2023-05-12",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {recentGigs.map((gig) => (
            <tr key={gig.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link
                  href={`/admin/gigs/${gig.id}`}
                  className="text-sm font-medium text-violet-600 hover:text-violet-700"
                >
                  {gig.title}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {gig.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {gig.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    gig.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : gig.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-violet-600 hover:text-violet-900 mr-3">
                  Edit
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
