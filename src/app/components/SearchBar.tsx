import { CATEGORIES } from "@/utils/constants";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  moderationFilter,
  setModerationFilter,
}: {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  categoryFilter: string;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
  moderationFilter: string;
  setModerationFilter: React.Dispatch<React.SetStateAction<string>>;
  gigs: { category: string }[];
}) => {
  const filterOptions = [
    { label: "All", value: "All", icon: "🧾" },
    { label: "Pending", value: "Pending", icon: "⏳" },
    { label: "Approved", value: "Approved", icon: "✅" },
    { label: "Rejected", value: "Rejected", icon: "❌" },
  ];

  const getPillClasses = (value: string, active: boolean) => {
    const colorMap = {
      All: "gray",
      Pending: "amber",
      Approved: "green",
      Rejected: "red",
    };

    const color = colorMap[value as keyof typeof colorMap];

    if (active) {
      return `bg-${color}-600 text-white border-${color}-600`;
    } else {
      return `bg-white text-gray-700 border-gray-300 hover:bg-${color}-100`;
    }
  };

  return (
    <>
      {/* Tailwind JIT safe classes (hidden) */}
      <div className="hidden">
        bg-gray-600 border-gray-600 hover:bg-gray-100 bg-amber-600
        border-amber-600 hover:bg-amber-100 bg-green-600 border-green-600
        hover:bg-green-100 bg-red-600 border-red-600 hover:bg-red-100
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full md:w-1/2"
        />

        <div className="flex items-center gap-2 md:w-1/5">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pills UI */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {filterOptions.map(({ label, value, icon }) => (
          <button
            key={value}
            onClick={() => setModerationFilter(value)}
            className={`flex items-center gap-1 px-4 py-1 rounded-full text-sm font-medium border shadow-sm transition ${getPillClasses(
              value,
              moderationFilter === value
            )}`}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default SearchBar;
