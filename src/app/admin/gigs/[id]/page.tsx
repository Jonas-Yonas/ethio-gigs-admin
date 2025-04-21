"use client";

import Spinner from "@/app/components/Spinner";
import { fetchGigById } from "@/app/services/gigService";
import { Gig } from "@/types/gig";
import { CATEGORIES } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { use } from "react";

const GigDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { id } = use(params); // Unwrap the Promise to access the id

  const { data, isLoading, isError } = useQuery<Gig | null, Error>({
    queryKey: ["gigDetails", id],
    queryFn: async () => {
      const gig = await fetchGigById(id); // This might return null
      if (!gig) throw new Error("Gig not found");
      return gig;
    },
    enabled: !!id, // Only run the query if gigId is available
  });

  // Loading or error state
  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <p className="text-center text-red-600">❌ Failed to load gig details.</p>
    );

  if (!data) return <div className="p-4 text-red-500">Gig not found.</div>;

  const gig = data;
  const category = CATEGORIES.find((c) => c.value === gig.category);

  const gigLink = `${window.location.origin}/gigs/${id}`; // Create a unique URL for the gig

  return (
    <div className="max-w-xl lg:max-w-4xl mx-auto p-6 rounded-xl shadow bg-white mt-6">
      <button
        onClick={() => router.back()}
        className="mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-2">{gig.title}</h1>
      <p className="text-gray-600 mb-4">{gig.description}</p>

      <div className="mb-2">
        <span className="font-medium">Category: </span>
        <span
          style={{ backgroundColor: category?.color }}
          className="px-2 py-1 rounded text-white"
        >
          {category?.label}
        </span>
      </div>

      <div className="mb-2">
        <span className="font-medium">Price: </span>
        <span>${gig.price}</span>
      </div>

      <div className="mb-4">
        <span className="font-medium">Posted by: </span>
        <span>@{gig.username}</span>
      </div>

      <div className="mb-6 text-sm text-gray-500">
        👀 {gig.views ?? 0} views
      </div>

      {gig.username && (
        <a
          href={`https://t.me/${gig.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          💬 Message Seller on Telegram
        </a>
      )}

      {/* QR Code Section */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Share this gig:</h3>
        <QRCodeCanvas value={gigLink} size={256} /> {/* QR code generation */}
        <div className="mt-2 text-center text-sm text-gray-600">
          Scan the QR code to view this gig.
        </div>
      </div>
    </div>
  );
};

export default GigDetailPage;
