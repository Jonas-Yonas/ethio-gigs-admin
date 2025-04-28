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
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200 flex flex-col h-[300px]">
      {/* Card Header */}
      <div className="p-5 pb-0">
        <Link href={`/admin/gigs/${gig._id}`}>
          <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-1">
            {gig.title}
          </h2>
        </Link>

        <div className="flex-grow mt-2">
          <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
            {gig.description}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-auto p-5 pt-0">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {gig.category}
          </span>

          <div className="flex items-center space-x-2">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                gig.moderationStatus === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : gig.moderationStatus === "Approved"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {gig.moderationStatus}
            </span>

            <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {gig.status}
            </span>
          </div>
        </div>

        {/* Action Buttons - Grouped by purpose */}
        <div className="flex flex-col space-y-2">
          {/* Primary Actions */}
          <div className="flex space-x-2">
            <button
              onClick={() => openEditModal(gig)}
              className="flex-1 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </button>

            <button
              onClick={() => handleClose(gig._id)}
              className="flex-1 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg
                className="w-4 h-4 mr-1"
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
              Close
            </button>
          </div>

          {/* Secondary Actions - Conditional Moderation */}
          {gig.moderationStatus === "Pending" && (
            <div className="flex space-x-0 rounded-lg overflow-hidden border border-gray-200">
              <button
                onClick={() => handleApprove(gig._id)}
                className="flex-1 text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-3 py-2 transition-colors flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
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
                Approve
              </button>

              <div className="w-px bg-gray-200"></div>

              <button
                onClick={() => handleReject(gig._id)}
                className="flex-1 text-sm font-medium text-white bg-red-600 hover:bg-red-700 px-3 py-2 transition-colors flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
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
                Reject
              </button>
            </div>
          )}

          {/* Destructive Action */}
          <button
            onClick={() => handleDelete(gig._id)}
            className="w-full text-sm font-medium text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg transition-colors flex items-center justify-center"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete Gig
          </button>
        </div>
      </div>
    </div>
  );
};

export default GigCard;
