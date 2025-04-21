import Link from "next/link";

type Gig = {
  _id: string;
  title: string;
  description: string;
  status: string;
  category: string;
};

const GigCard = ({
  gig,
  handleDelete,
  handleClose,
  openEditModal,
}: {
  gig: Gig;
  handleDelete: (gigId: string) => void;
  handleClose: (gigId: string) => void;
  openEditModal: (gig: Gig) => void;
}) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
      <Link href={`/admin/gigs/${gig._id}`}>
        <h2 className="text-lg font-semibold text-blue-600 hover:underline">
          {gig.title}
        </h2>
      </Link>
      <p className="text-gray-700 mt-2">{gig.description}</p>
      <p className="text-sm text-gray-500 mt-1">Category: {gig.category}</p>
      <p className="text-sm mt-1 text-gray-500">Status: {gig.status}</p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => openEditModal(gig)}
          className="text-white bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-md text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(gig._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
        <button
          onClick={() => handleClose(gig._id)}
          className="text-gray-950 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default GigCard;
