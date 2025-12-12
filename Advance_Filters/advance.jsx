const [isOpen, setIsOpen] = useState(false);

<button 
  onClick={() => setIsOpen(true)}
  className="px-4 py-2 bg-green-400 text-white rounded border"
>
  Advanced Filter
</button>



{/* Sidebar */}
<div
  className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
    isOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  <div className="flex justify-between items-center p-4 border-b-2 border-gray-200">
    <h2 className="text-lg font-semibold">Voters Filters</h2>
    <button
      onClick={() => setIsOpen(false)}
      className="text-gray-600 hover:text-gray-900"
    >
      ✕
    </button>
  </div>

  {/* Content */}
  <div className="p-4 space-y-4">
    {/* Part No */}
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Part No
      </label>
      <input
        type="text"
        placeholder="Enter part no"
        className="mt-1 block p-2 w-full border-gray-300 rounded-md shadow-sm"
      />
    </div>

    {/* Section No */}
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Section No
      </label>
      <input
        type="text"
        placeholder="Enter section no"
        className="mt-1 block p-2 w-full border-gray-300 rounded-md shadow-sm"
      />
    </div>

    {/* Gender */}
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Gender
      </label>
      <select title="gender selection "
        className="mt-1 block p-2 w-full border-gray-300 rounded-md shadow-sm"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>

    {/* Eligibility */}
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Eligibility
      </label>
      <select 
        title="eligibility selection "
      className="mt-1 block p-2 w-full border-gray-300 rounded-md shadow-sm">
        <option value="">Select Eligible</option>
        <option value="1">Eligible</option>
        <option value="0">Not Eligible</option>
      </select>
    </div>

    {/* Status */}
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Status
      </label>
      <select title="status selection "
       className="mt-1 block p-2 w-full border-gray-300 rounded-md shadow-sm">
        <option value="">Select Status</option>
        <option value="1">Active</option>
        <option value="0">Inactive</option>
      </select>
    </div>
  </div>
</div>

{/* close sidebar */}
{isOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-30 z-40"
    onClick={() => setIsOpen(false)}
  ></div>
)}
