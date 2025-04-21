import { CATEGORIES } from "@/utils/constants";

const GigFormModal = ({
  mode,
  title,
  description,
  category,
  price,
  setTitle,
  setDescription,
  setCategory,
  setPrice,
  onSubmit,
  handleClose,
}: {
  mode: "create" | "edit";
  title: string;
  description: string;
  category: string;
  price: number;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: () => void;
  handleClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] sm:w-[400px] shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {mode === "edit" ? "Edit Gig" : "Create New Gig"}
        </h2>
        <input
          className="w-full border px-3 py-2 rounded mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border px-3 py-2 rounded mb-3"
          placeholder="Description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="w-full border px-3 py-2 rounded mb-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.label} value={cat.value}>
              {cat.icon} {cat.label}
            </option>
          ))}
        </select>
        <input
          className="w-full border px-3 py-2 rounded mb-3"
          placeholder="Price (ETB)"
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className={`px-4 py-2 text-white rounded ${
              mode === "edit" ? "bg-blue-600" : "bg-green-600"
            }`}
          >
            {mode === "edit" ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GigFormModal;
