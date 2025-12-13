// Pagination
const [currentPage, setCurrentPage] = useState(1);
const [perPage, setPerPage] = useState(10);
const [total, setTotal] = useState(0);
const [totalPages, setTotalPages] = useState(1);


  // Fetch when any filter changes
  useEffect(() => {
    fetchVoters();
  }, [search, partNo, sectionNo, status,gender,currentPage,perPage]);


    //Add row change handler Pagination 
   const handleRowsChange = (value) => {
  const num = parseInt(value, 10);
  if (!isNaN(num) && num > 0) {
    setPerPage(num);
    setCurrentPage(1); // Reset to first page when rows per page change
  }
};




{/* Pagination Container */}
<div className="flex flex-col sm:flex-row items-center justify-between px-4 py-4 border-t border-gray-200 bg-white rounded-b-2xl mt-4 gap-3">

  {/* Row per page filter */}
  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
    <label className="text-sm text-gray-600 font-medium whitespace-nowrap">Rows:</label>
    
    {/* Manual input */}
    <input
      type="number"
      min="1"
      value={perPage}
      onChange={(e) => handleRowsChange(e.target.value)}
      className="w-20 sm:w-24 border border-gray-300 bg-white rounded-lg px-2 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-[#009699]"
      placeholder="Rows"
    />

    {/* Dropdown */}
    <select title="row pagination "
      value={perPage}
      onChange={(e) => handleRowsChange(e.target.value)}
      className="w-24 border border-gray-300 bg-white rounded-lg px-2 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-[#009699]"
    >
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  </div>

  {/* Mobile view */}
  <div className="flex justify-between w-full sm:hidden">
    <button 
      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="px-4 py-2 text-sm font-medium bg-[#009699] text-white rounded-lg shadow active:scale-95 transition disabled:opacity-50 disabled:active:scale-100"
    >
      Previous
    </button>
    <button 
      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="ml-3 px-4 py-2 text-sm font-medium bg-[#009699] text-white rounded-lg shadow active:scale-95 transition disabled:opacity-50 disabled:active:scale-100"
    >
      Next
    </button>
  </div>

  {/* Desktop view */}
  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end gap-4 flex-wrap">
    <p className="text-sm text-gray-600 font-medium">
      Showing{" "}
      <span className="font-semibold text-gray-800">{(currentPage - 1) * perPage + 1}</span>{" "}
      to{" "}
      <span className="font-semibold text-gray-800">{Math.min(currentPage * perPage, total)}</span>{" "}
      of <span className="font-semibold text-gray-800">{total}</span> results
    </p>

    <nav className="inline-flex rounded-xl overflow-hidden shadow-sm border border-gray-300 flex-wrap">
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-white text-gray-500 border-r border-gray-300 hover:bg-gray-50 transition font-medium disabled:opacity-50"
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          type="button"
          key={index + 1}
          onClick={() => setCurrentPage(index + 1)}
          className={`px-3 sm:px-4 py-2 text-sm font-medium border-r transition ${
            currentPage === index + 1 ? "bg-[#009699] text-white" : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-white text-gray-500 hover:bg-gray-50 transition font-medium disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  </div>
</div>
