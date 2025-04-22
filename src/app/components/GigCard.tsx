import { Gig } from "@/types/gig";
import Link from "next/link";

const GigCard = ({
  gig,
  handleDelete,
  handleClose,
  openEditModal,
  handleApprove,
  handleReject,
}: {
  gig: Gig;
  handleDelete: (gigId: string) => void;
  handleClose: (gigId: string) => void;
  openEditModal: (gig: Gig) => void;
  handleApprove: (gigId: string) => void;
  handleReject: (gigId: string) => void;
}) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200 h-[270px] flex flex-col">
      <Link href={`/admin/gigs/${gig._id}`}>
        <h2 className="text-lg font-semibold text-blue-600 hover:underline line-clamp-1">
          {gig.title}
        </h2>
      </Link>

      <div className="flex-grow">
        <p className="text-gray-700 mt-2 line-clamp-3">{gig.description}</p>
      </div>

      <div className="mt-auto">
        <p className="text-sm text-gray-500">Category: {gig.category}</p>
        <p className="text-sm mt-1 text-gray-500">
          Status: {gig.status} | Moderation:{" "}
          <span
            className={`${
              gig.moderationStatus === "Pending"
                ? "text-yellow-500"
                : gig.moderationStatus === "Approved"
                ? "text-green-600"
                : "text-red-500"
            } font-semibold`}
          >
            {gig.moderationStatus}
          </span>
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
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

          {/* 🆕 Show moderation buttons only if status is pending */}
          {gig.moderationStatus === "Pending" && (
            <>
              <button
                onClick={() => handleApprove(gig._id)}
                className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md text-sm"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(gig._id)}
                className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm"
              >
                Reject
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GigCard;
