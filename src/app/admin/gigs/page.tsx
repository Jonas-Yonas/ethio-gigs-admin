"use client";

import GigCard from "@/app/components/GigCard";
import GigFormModal from "@/app/components/GigFormModal";
import SearchBar from "@/app/components/SearchBar";
import Spinner from "@/app/components/Spinner";
import { useGigContext } from "@/app/contexts/GigContext";
import {
  createGig,
  deleteGig,
  fetchGigs,
  updateGig,
} from "@/app/services/gigService";
import { Gig } from "@/types/gig";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type GigsResponse = {
  gigs: Gig[];
  totalPages: number;
};

const GigsPage = () => {
  const {
    gigs,
    setGigs,
    currentPage,
    setTotalPages,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    moderationFilter,
    setModerationFilter,
  } = useGigContext();

  const [editingGig, setEditingGig] = useState<Gig>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number>(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data, isLoading, isError } = useQuery<GigsResponse, Error>({
    queryKey: ["gigs", currentPage],
    queryFn: () => fetchGigs(currentPage),
    keepPreviousData: true,
  } as UseQueryOptions<GigsResponse, Error>);

  useEffect(() => {
    if (data) {
      setGigs(data.gigs);
      setTotalPages(data.totalPages);
    }
  }, [data, setGigs, setTotalPages]);

  // const filteredGigs = gigs.filter(
  //   (gig) =>
  //     gig.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //     (categoryFilter ? gig.category === categoryFilter : true)
  // );

  const filteredGigs = gigs.filter((gig) => {
    const matchesSearch = gig.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter
      ? gig.category === categoryFilter
      : true;
    const matchesModeration =
      moderationFilter === "all"
        ? true
        : gig.moderationStatus === moderationFilter;

    return matchesSearch && matchesCategory && matchesModeration;
  });

  const handleClose = () => {
    setEditingGig(undefined);
  };

  const handleCreate = async () => {
    setIsCreating(true); // Set loading state
    const newGig = await createGig({
      title,
      description,
      category,
      price,
      username: "Jonas", // will be replace by logged in user later on
      telegramId: "123456", // will find a way to capture it or ...
    });
    setGigs((prev) => [...prev, newGig]);
    setIsModalOpen(false);
    setIsCreating(false); // Reset loading state
  };

  const handleUpdate = async () => {
    if (!editingGig) return;

    setIsEditing(true); // Set loading state
    const toastId = toast.loading("Updating gig...");
    try {
      const updatedGig = await updateGig({
        gigId: editingGig._id,
        title: title || editingGig.title,
        description: description || editingGig.description,
        category: category || editingGig.category,
        price: price || +editingGig.price,
        username: editingGig.username,
        telegramId: editingGig.telegramId,
      });

      setGigs((prev) =>
        prev.map((gig) => (gig._id === updatedGig._id ? updatedGig : gig))
      );
      setEditingGig(undefined);
      setIsModalOpen(false);
      toast.success("Gig updated!", { id: toastId });
    } catch (err) {
      toast.error("❌ Failed to update gig", { id: toastId });
      console.error("❌ Update error:", err);
    }
    setIsEditing(false); // Reset loading state
  };

  const handleDelete = async (gigId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this gig?"
    );
    if (!confirmed) return;

    setIsDeleting(true); // Set loading state
    const toastId = toast.loading("Deleting gig...");
    const success = await deleteGig(gigId);

    if (success) {
      setGigs((prev) => prev.filter((g) => g._id !== gigId));
      toast.success("Gig deleted!", { id: toastId });
    } else {
      toast.error("Failed to delete gig", { id: toastId });
    }
    setIsDeleting(false); // Reset loading state
  };

  const handleApprove = async (gigId: string) => {
    try {
      await fetch(`/api/gigs/${gigId}/moderate`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moderationStatus: "approved" }),
      });
      // optionally re-fetch or update local state
    } catch (error) {
      console.error("Error approving gig:", error);
    }
  };

  const handleReject = async (gigId: string) => {
    try {
      await fetch(`/api/gigs/${gigId}/moderate`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moderationStatus: "rejected" }),
      });
      // optionally re-fetch or update local state
    } catch (error) {
      console.error("Error rejecting gig:", error);
    }
  };

  const openCreateModal = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setPrice(0);
    setModalMode("create");
    setEditingGig(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (gig: Gig) => {
    setTitle(gig.title);
    setDescription(gig.description);
    setEditingGig(gig);
    setCategory(gig.category);
    setPrice(+gig.price);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  // Loading or error state
  if (isLoading) return <Spinner />;
  if (isError)
    return <p className="text-center text-red-600">❌ Failed to load gigs.</p>;

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        📋 Gigs List
      </h1>

      {/* Show spinner if creating, editing, or deleting */}
      {(isCreating || isEditing || isDeleting) && (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      )}

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        moderationFilter={moderationFilter}
        setModerationFilter={setModerationFilter}
        gigs={gigs}
      />

      <button
        onClick={openCreateModal}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        ➕ Create New Gig
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredGigs.map((gig) => (
          <GigCard
            key={gig._id}
            gig={gig}
            openEditModal={() => openEditModal(gig)}
            handleDelete={() => handleDelete(gig._id)}
            handleClose={handleClose}
            handleApprove={() => handleApprove(gig._id)}
            handleReject={() => handleReject(gig._id)}
          />
        ))}
      </div>

      {isModalOpen && (
        <GigFormModal
          mode={modalMode}
          title={title}
          description={description}
          category={category}
          price={price}
          setTitle={setTitle}
          setDescription={setDescription}
          setCategory={setCategory}
          setPrice={setPrice}
          onSubmit={modalMode === "edit" ? handleUpdate : handleCreate}
          handleClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
};

export default GigsPage;
