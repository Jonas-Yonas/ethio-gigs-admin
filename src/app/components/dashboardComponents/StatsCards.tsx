export default function StatsCards() {
  const stats = [
    {
      name: "Total Gigs",
      value: "1,234",
      change: "+12%",
      changeType: "positive",
    },
    {
      name: "Pending Moderation",
      value: "56",
      change: "+3",
      changeType: "negative",
    },
    {
      name: "Active Users",
      value: "892",
      change: "+5%",
      changeType: "positive",
    },
    {
      name: "Revenue",
      value: "$24,567",
      change: "+18%",
      changeType: "positive",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p
              className={`ml-2 text-sm font-medium ${
                stat.changeType === "positive"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {stat.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
