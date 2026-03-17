import React from "react";

interface PaginationProps {
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  page,
  limit,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex space-x-2 mt-4 justify-center">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded ${
            p === page ? "bg-blue-600 text-white" : "border hover:bg-gray-100"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
