"use client";

import GigCard from "@/app/components/GigCard";
import GigFormModal from "@/app/components/GigFormModal";
import SearchBar from "@/app/components/SearchBar";
import { useGigContext } from "@/app/contexts/GigContext";
import {
  createGig,
  deleteGig,
  fetchGigs,
  updateGig,
} from "@/app/services/gigService";
import { Gig } from "@/types/gig";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
  } = useGigContext();

  const [editingGig, setEditingGig] = useState<Gig>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number>(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  useEffect(() => {
    const loadGigs = async () => {
      const data = await fetchGigs(currentPage);
      setGigs(data.gigs);
      setTotalPages(data.totalPages);
    };

    loadGigs();
  }, [currentPage, setGigs, setTotalPages]);

  const filteredGigs = gigs.filter(
    (gig) =>
      gig.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter ? gig.category === categoryFilter : true)
  );

  const handleClose = () => {
    setEditingGig(undefined);
  };

  const handleCreate = async () => {
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
  };

  const handleUpdate = async () => {
    if (!editingGig) return;

    const toastId = toast.loading("Updating gig...");
    try {
      const updatedGig = await updateGig({
        gigId: editingGig._id,
        title: title ? title : editingGig.title,
        description: description ? description : editingGig.description,
        category: category ? category : editingGig.category,
        price: price ? price : +editingGig.price,
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
  };

  const handleDelete = async (gigId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this gig?"
    );
    if (!confirmed) return;

    const toastId = toast.loading("Deleting gig...");
    const success = await deleteGig(gigId);

    if (success) {
      setGigs((prev) => prev.filter((g) => g._id !== gigId));
      toast.success("Gig deleted!", { id: toastId });
    } else {
      toast.error("Failed to delete gig", { id: toastId });
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

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        📋 Gigs List
      </h1>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
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
