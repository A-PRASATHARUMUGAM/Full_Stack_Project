import { useState } from "react";

const options = [
  { id: 1, name: "Available", status: "online" },
  { id: 2, name: "Busy", status: "busy" },
  { id: 3, name: "Away", status: "away" },
  { id: 4, name: "Offline", status: "offline" },
];

const statusColor = {
  online: "bg-green-500",
  busy: "bg-red-500",
  away: "bg-yellow-500",
  offline: "bg-gray-400",
};

export default function StatusComboBox() {
    
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const filtered = options.filter((opt) =>
    opt.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-72 relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Status
      </label>

      {/* Input */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <span className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${statusColor[selected.status]}`}
          />
          <span className="text-gray-700">{selected.name}</span>
        </span>
        <svg
          className="h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-10 mt-2 w-full rounded-xl bg-white shadow-lg border border-gray-200">
          {/* Search */}
          <input
            type="text"
            placeholder="Search status..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border-b border-gray-200 px-3 py-2 text-sm focus:outline-none"
          />

          <ul className="max-h-56 overflow-auto">
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-500">No results</li>
            )}

            {filtered.map((opt) => (
              <li
                key={opt.id}
                onClick={() => {
                  setSelected(opt);
                  setOpen(false);
                  setQuery("");
                }}
                className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100"
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${statusColor[opt.status]}`}
                />
                <span className="text-gray-700">{opt.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
