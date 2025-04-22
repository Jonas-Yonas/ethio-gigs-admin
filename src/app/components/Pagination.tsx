"use client";

import { useGigContext } from "@/app/contexts/GigContext";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  maxVisiblePages?: number;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  maxVisiblePages = 5,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we're at the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Always show first page
    if (startPage > 1) {
      pages.push(
        <PageButton
          key={1}
          page={1}
          currentPage={currentPage}
          onClick={() => onPageChange(1)}
        />
      );
      if (startPage > 2) {
        pages.push(<Ellipsis key="start-ellipsis" />);
      }
    }

    // Visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageButton
          key={i}
          page={i}
          currentPage={currentPage}
          onClick={() => onPageChange(i)}
        />
      );
    }

    // Always show last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<Ellipsis key="end-ellipsis" />);
      }
      pages.push(
        <PageButton
          key={totalPages}
          page={totalPages}
          currentPage={currentPage}
          onClick={() => onPageChange(totalPages)}
        />
      );
    }

    return pages;
  };

  return (
    <div
      className={`flex flex-wrap justify-center items-center gap-2 ${className}`}
      aria-label="Pagination"
    >
      <NavButton
        direction="previous"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />

      <div className="flex items-center gap-1">{renderPageNumbers()}</div>

      <NavButton
        direction="next"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </div>
  );
};

// Sub-components for better organization
const PageButton = ({
  page,
  currentPage,
  onClick,
}: {
  page: number;
  currentPage: number;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-10 h-10 rounded-md transition-colors flex items-center justify-center cursor-pointer ${
      currentPage === page
        ? "bg-blue-600 text-white font-medium"
        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
    }`}
    aria-current={currentPage === page ? "page" : undefined}
    aria-label={
      currentPage === page ? `Current page, page ${page}` : `Go to page ${page}`
    }
  >
    {page}
  </button>
);

const Ellipsis = () => (
  <span className="w-10 h-10 flex items-center justify-center text-gray-500">
    ...
  </span>
);

const NavButton = ({
  direction,
  disabled,
  onClick,
}: {
  direction: "previous" | "next";
  disabled: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-1 ${
      disabled
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
    }`}
    aria-label={`${direction} page`}
  >
    {direction === "previous" ? (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        Prev
      </>
    ) : (
      <>
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </>
    )}
  </button>
);

// Context-connected version
export const PaginationWithContext = ({
  className = "",
  maxVisiblePages = 5,
}: {
  className?: string;
  maxVisiblePages?: number;
}) => {
  const { currentPage, setCurrentPage, totalPages } = useGigContext();

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      className={className}
      maxVisiblePages={maxVisiblePages}
    />
  );
};

export default Pagination;
