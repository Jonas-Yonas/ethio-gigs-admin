"use client";

import { Gig } from "@/types/gig";
import { createContext, useContext, useState, ReactNode } from "react";

type GigContextType = {
  gigs: Gig[];
  setGigs: React.Dispatch<React.SetStateAction<Gig[]>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  categoryFilter: string;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
};

const GigContext = createContext<GigContextType | undefined>(undefined);

export const useGigContext = () => {
  const context = useContext(GigContext);
  if (!context) {
    throw new Error("useGigContext must be used within a GigProvider");
  }
  return context;
};

export const GigProvider = ({ children }: { children: ReactNode }) => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  return (
    <GigContext.Provider
      value={{
        gigs,
        setGigs,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        searchTerm,
        setSearchTerm,
        categoryFilter,
        setCategoryFilter,
      }}
    >
      {children}
    </GigContext.Provider>
  );
};
