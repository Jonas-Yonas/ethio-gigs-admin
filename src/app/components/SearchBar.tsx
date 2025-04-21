import { CATEGORIES } from "@/utils/constants";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
}: {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  categoryFilter: string;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
  gigs: { category: string }[];
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border border-gray-300 rounded-md w-full md:w-1/2"
      />
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="p-2 border border-gray-300 rounded-md w-full md:w-1/3"
      >
        <option value="">All Categories</option>

        {CATEGORIES.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.icon} {cat.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
