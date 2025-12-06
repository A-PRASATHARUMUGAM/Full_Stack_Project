import React, { useEffect, useState } from "react";
import api from "../api/api"; // your axios instance

const VoterLists = () => {
  const [search, setSearch] = useState("");
  const [partNo, setPartNo] = useState("");
  const [sectionNo, setSectionNo] = useState("");
  const [status, setStatus] = useState("");
  const [voters, setVoters] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [total, setTotal] = useState(0);

  // Fetch voters with filters + pagination
  const fetchVoters = async () => {
    try {
      const res = await api.get("/voterfilter2", {
        params: {
          search: search,
          part_no: partNo,
          section_no: sectionNo,
          status: status,
          page: currentPage,
          per_page: perPage,
        },
      });

      setVoters(res.data.data);
      setTotal(res.data.total);
      setCurrentPage(res.data.current_page);
    } catch (error) {
      console.error(error);
    }
  };
 // Fetch when any filter changes
  useEffect(() => {
    fetchVoters();
  }, [search, partNo, sectionNo, status, currentPage]);

  // Reset Filters
  const resetFilters = () => {
    setSearch("");
    setPartNo("");
    setSectionNo("");
    setStatus("");
    setCurrentPage(1);
  };

  // UI color for dropdown status
  const getStatusBg = (value) => {
    if (value === "1") return "bg-[#009699] text-white";
    if (value === "0") return "bg-red-500 text-white";
    return "bg-white text-black";
  };

  // Update status API
  const updateStatus = async (voterId, newStatus) => {
    try {
      await api.put(`/voters/${voterId}/status`, {
        status: newStatus,
      });

      // Update State
      setVoters((prev) =>
        prev.map((v) => (v.id === voterId ? { ...v, status: newStatus } : v))
      );
    } catch (error) {
      alert("Failed to update status!");
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(total / perPage);

  const goNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
       
{/* Pagination Container */}
<div className="flex items-center justify-between px-0 py-2 md:px-4 md:py-4 border-t border-gray-200 bg-white rounded-b-2xl">

  {/* Row per page filter */}
  <div className="hidden sm:flex items-center gap-2">
    <label className="text-sm text-gray-600 font-medium">Rows:</label>


 {/* // reset to first page */}
    <select
      value={perPage}
      onChange={(e) => {
        setPerPage(Number(e.target.value));
        setCurrentPage(1);
      }}
      className="border border-gray-300 bg-white rounded-lg px-3 py-1.5 text-sm 
                 text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-[#009699]"
    >
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  </div>

  {/* Mobile View */}
  <div className="flex-1 flex justify-between sm:hidden">
    <button 
      onClick={goPrev} 
      disabled={currentPage === 1}
      className="px-4 py-2 text-sm font-medium bg-[#009699] text-white rounded-lg shadow 
      active:scale-95 transition disabled:opacity-50 disabled:active:scale-100"
    >
      Previous
    </button>

    <button 
      onClick={goNext}
      disabled={currentPage === totalPages}
      className="ml-3 px-4 py-2 text-sm font-medium bg-[#009699] text-white rounded-lg shadow 
      active:scale-95 transition disabled:opacity-50 disabled:active:scale-100"
    >
      Next
    </button>
  </div>

  {/* Desktop View */}
  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">

    {/* Results Summary */}
    <p className="text-sm text-gray-600 font-medium mr-4">
      Showing{" "}
      <span className="font-semibold text-gray-800">
        {(currentPage - 1) * perPage + 1}
      </span>{" "}
      to{" "}
      <span className="font-semibold text-gray-800">
        {Math.min(currentPage * perPage, total)}
      </span>{" "}
      of{" "}
      <span className="font-semibold text-gray-800">
        {total}
      </span>{" "}
      results
    </p>

    {/* Pagination */}
    <nav className="inline-flex rounded-xl overflow-hidden shadow-sm border border-gray-300">

      {/* Prev */}
      <button
        onClick={goPrev}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-white text-gray-500 border-r border-gray-300
        hover:bg-gray-50 transition font-medium disabled:opacity-50"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setCurrentPage(index + 1)}
          className={`px-4 py-2 text-sm font-medium border-r transition
            ${currentPage === index + 1
              ? "bg-[#009699] text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"}
          `}
        >
          {index + 1}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={goNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-white text-gray-500 
        hover:bg-gray-50 transition font-medium disabled:opacity-50"
      >
        Next
      </button>

    </nav>
  </div>

</div>

    </>
  );
};

export default VoterLists;
