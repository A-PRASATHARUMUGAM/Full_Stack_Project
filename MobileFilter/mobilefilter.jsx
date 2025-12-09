    <div className="md:hidden border border-gray-200 rounded-md flex justify-center items-center mx-2 px-2 bg-[#E9F6EC]">  
            <i onClick={() => setShowFilter(true)}>   
                <img src={MFilterIcons} alt="" id="m-filter_icon" className="w-8 h-8"/>
            </i>  
            </div>  

{/* Background Dim Overlay */}

{showFilter && (
  <div
    onClick={() => setShowFilter(false)}
    className="fixed inset-0 bg-black opacity-50 z-40 transition-opacity duration-300 md:hidden">

  </div>
)}  

{/* Bottom Sheet Filter Bar */}
<div
  className={`fixed md:hidden z-50 left-0 w-full bg-white shadow-lg rounded-t-xl 
  transition-all duration-300
  ${showFilter ? "bottom-0" : "-bottom-full"}
`} 
>
  <div className="p-4 relative">

    <h2 className="text-md font-semibold mb-4">Filter Options</h2>

    <button
      onClick={() => setShowFilter(false)}
      className="absolute top-4 right-4 font-bold text-gray-800 hover:text-gray-700"
    >
      ✕
    </button>

    {/* Part No */}
    <label className="block mb-2 font-medium text-gray-700">Select Part No</label>
    <select title="voter partno filter"
    value={partNo} onChange={(e) => setPartNo(e.target.value)}  className="w-full border text-gray-600 border-gray-500 rounded-lg p-2 mb-6">
          <option value="">Select Part No</option>
          <option value="1">Part 1</option>
          <option value="2">Part 2</option>
          <option value="3">Part 3</option>
          <option value="4">Part 4</option>
          <option value="5">Part 5</option>
          <option value="6">Part 6</option>
          <option value="7">Part 7</option>
          <option value="8">Part 8</option>
          <option value="9">Part 9</option>
          <option value="10">Part 10</option>
    </select>

    {/* Section No */}
    <label  className="block mb-2 font-medium text-gray-700">Select Section No</label>
    <select  title="voter sectionno filter" value={sectionNo} onChange={(e) => setSectionNo(e.target.value)}  
    className="w-full border text-gray-600 border-gray-500 rounded-lg p-2 mb-6">
                         <option value="">Select Section No</option>
                        <option value="1">Section 1</option>
                        <option value="2">Section 2</option>
                        <option value="3">Section 3</option>
                        <option value="4">Section 4</option>
                        <option value="5">Section 5</option>
    </select> 

    {/* Status */}
    <label className="block mb-2 font-medium text-gray-700">Filter by Status</label>
    <select value={status}  title="voter status filter " onChange={(e) => setStatus(e.target.value)} className="w-full border text-gray-600 border-gray-500 rounded-lg p-2 mb-6">
               <option value="">Select Status</option>
                <option value="1">Visited</option>
                <option value="0">Not Visited</option>
    </select>

    {/* Buttons */}
    <div className="flex justify-between">
      <button className="px-4 py-2 bg-gray-300 rounded-lg">Clear Filter</button>
      <button className="px-4 py-2 bg-[#009699] text-white rounded-lg">Apply Filter</button>
    </div>

  </div>
</div>
