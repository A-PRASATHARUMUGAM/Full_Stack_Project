const VoterLists = () => {
  const [search, setSearch] = useState("");
  const [partNo, setPartNo] = useState("");
  const [sectionNo, setSectionNo] = useState("");
  const [status, setStatus] = useState("");
  const [voters, setVoters] = useState([]);

  const fetchVoters = async () => {
    try {
      const res = await api.get("/voterfilter2", {
        params: { search, part_no: partNo, section_no: sectionNo, status }
      });
      setVoters(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVoters();
  }, [search, partNo, sectionNo, status]);

  const resetFilters = () => {
    setSearch("");
    setPartNo("");
    setSectionNo("");
    setStatus("");
  };

  const getStatusBg = (value) => {
    if (value === "1") return "bg-[#009699] text-white"; // visited
    if (value === "0") return "bg-red-500 text-white";    // not visited
    return "bg-white text-black";                         // default
  };

  //  Function to update status in the backend
  const updateStatus = async (voterId, newStatus) => {
    try {
      const res = await api.put(`/voters/${voterId}/status`, {
        status: newStatus
      });

      // Update local state for instant UI change
      setVoters(prev =>
        prev.map(v => (v.id === voterId ? { ...v, status: newStatus } : v))
      );

      console.log(res.data.message);

    } catch (error) {

      console.error("Failed to update status:", error);
      
      alert("Failed to update status!");
    }
  };

  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {voters.map(voter => (
          <tr key={voter.id} className="border-b">
            <td>{voter.id}</td>
            <td>{voter.name}</td>
            <td className="text-center">
             <select
              value={voter.status}
              onChange={(e) => updateStatus(voter.id, e.target.value)}
              className={`text-start  text-white rounded px-2 py-1 text-sm ${getStatusBg(voter.status)}`}
                >
                <option value="1" className="bg-[#009699]" >Visited</option>
                <option value="0"className="bg-red-500" >Not Visited</option>
            </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VoterLists;
