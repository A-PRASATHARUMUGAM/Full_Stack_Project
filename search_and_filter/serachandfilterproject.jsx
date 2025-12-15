
 // Part no: Search and filter 
  const [partOptions, setPartOptions] = useState([]);
  const [partOpen, setPartOpen] = useState(false);
  const [partQuery, setPartQuery] = useState("");
  const [selectedPart, setSelectedPart] = useState({
    value: "",
    name: "Select Part No",
  });

  // Fetch part numbers from backend
  useEffect(() => {
    const fetchPartNumbers = async () => {
      try {
        const res = await api.get("/partnos");
        const options = res.data.map((p, i) => ({
          id: i + 1,
          value: p.part_no,
          name: `Part ${p.part_no}`,
        }));
        setPartOptions(options);
      } catch (error) {
        console.error("Error fetching part numbers:", error);
      }
    };
    fetchPartNumbers();
  }, []);

  // Filter parts by search query
  const filteredParts = partOptions.filter((p) =>
    p.name.toLowerCase().includes(partQuery.toLowerCase())
  ); 



{/* <!-- Voter filter by Part no  --> */}
    {/*  Part No Search and Filter */}
<div className="w-45 relative">
        <button
        onClick={() => setPartOpen(!partOpen)}
        className="w-full flex items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-left shadow-sm"
        >
        <i className="w-6 h-6">
            <img src={VoterLocationFIcon} alt="part number selection icon" />
        </i>
        <span className="text-gray-700">{selectedPart.name}</span>
        <svg
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
            />
        </svg>
        </button>

        {partOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-xl bg-white shadow-lg border border-gray-200">
            <input
            type="text"
            placeholder="Search part no..."
            value={partQuery}
            onChange={(e) => setPartQuery(e.target.value)}
            className="w-full border-b border-gray-200 px-3 py-2 text-sm focus:outline-none"
            />

            <ul className="max-h-56 overflow-auto">
            {filteredParts.length === 0 && (
                <li className="px-3 py-2 text-sm text-gray-500">No results</li>
            )}
            {filteredParts.map((part) => (
                <li
                key={part.id}
                onClick={() => {
                    setSelectedPart(part);
                    setPartNo(Number(part.value));
                    setPartOpen(false);
                    setPartQuery("");
                }}
                className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
                >
                {part.name}
                </li>
            ))}
            </ul>
        </div>
        )}
    </div>