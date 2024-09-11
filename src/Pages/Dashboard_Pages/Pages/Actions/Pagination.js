import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  return (
    <div className="pagination">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        <IoIosArrowBack />
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => setCurrentPage(index + 1)}
          className={index + 1 === currentPage ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
}
