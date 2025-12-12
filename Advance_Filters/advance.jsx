import { useState } from "react";

export default function AdvancedFilter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Advanced Filter
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-gray-900"
          >
            ✕
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-4 space-y-4">
          {/* Eligibility */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Eligibility
            </label>
            <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option>Eligible</option>
              <option>Not Eligible</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option>Active</option>
              <option>Inactive</option>
              <option>Pending</option>
            </select>
          </div>

          {/* Section No */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Section No
            </label>
            <input
              type="text"
              placeholder="Enter section no"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Part No */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Part No
            </label>
            <input
              type="text"
              placeholder="Enter part no"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Apply Button */}
          <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}