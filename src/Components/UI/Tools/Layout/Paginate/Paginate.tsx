import { ArrowLeft, ArrowRight } from "react-huge-icons/outline";
import { IPaginate } from "./types";
import React from "react";

const Paginate = ({ totalItems, itemsPerPage, currentPage, onPageChange }: IPaginate) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const windowSize = 2; // How many pages to show around the current page

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - windowSize);
      let end = Math.min(totalPages - 1, currentPage + windowSize);

      if (start > 2) pages.push("...");
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) pages.push("...");
      
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-2 py-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-900 active:scale-90 transition-all disabled:opacity-30 disabled:pointer-events-none group"
        aria-label="Previous Page"
      >
        <ArrowLeft className="text-xl group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <div className="flex items-center gap-1.5">
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="w-8 text-center text-slate-400 font-black tracking-widest text-[10px]">•••</span>
            ) : (
              <button
                onClick={() => onPageChange(Number(page))}
                className={`w-10 h-10 rounded-xl text-sm font-black transition-all duration-300 active:scale-90 ${
                  currentPage === page
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                    : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300"
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-900 active:scale-90 transition-all disabled:opacity-30 disabled:pointer-events-none group"
        aria-label="Next Page"
      >
        <ArrowRight className="text-xl group-hover:translate-x-0.5 transition-transform" />
      </button>
    </nav>
  );
};

export default React.memo(Paginate);
