// Store selected rows
const [selectedVoters, setSelectedVoters] = useState([]);




// Handle checkbox select/unselect
const handleCheckboxChange = (voter) => {


  const selectedData = {
    part_no: voter.part_no,
    section_no: voter.section_no,
    voter_id_no: voter.voter_id_no,
    e_name: voter.e_name,
    t_name: voter.t_name,


  };


  setSelectedVoters((prev) =>

    prev.some((v) => v.voter_id_no === voter.voter_id_no)

      ? prev.filter((v) => v.voter_id_no !== voter.voter_id_no) // remove

      : [...prev, selectedData] // add
  );

}


// Post the data to API

const handleSubmitSelected = async () => {

  if (selectedVoters.length === 0) {

    alert("Please select at least one voter.");

    return;
  }

  try {

    const response = await api.post("/familygrouping", {

      voters: selectedVoters,

    });

    console.log("Saved:", response.data);

    alert("Family grouping saved successfully!");

  } catch (error) {

    console.error(error);

    alert("Failed to save.");

  }
};





// Return Implementaiton 

{voters.map((voter) => (

  <tr key={voter.id}>

    <td className="px-4 py-2 text-left text-sm font-semibold text-gray-700">

      <input
        title="checkbox"

        type="checkbox"

        className="accent-[#009699] mr-2"

        checked={selectedVoters.some((v) => v.voter_id_no === voter.voter_id_no)}

        onChange={() => handleCheckboxChange(voter)}
      />

      {voter.voter_id_no}

    </td>

    <td className="px-4 py-2 text-center font-semibold text-sm text-[#676D73]">
      {voter.e_name}
    </td>

    <td className="px-4 py-2 text-center font-semibold text-sm text-[#676D73]">
      {voter.part_no}
    </td>

    <td className="px-4 py-2 text-center font-semibold text-sm text-[#676D73]">
      {voter.age}
    </td>

    <td className="px-4 py-2 text-center font-semibold text-sm text-[#676D73]">
      {voter.gender}
    </td>

    <td className="px-4 py-3 text-center">
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          Number(voter.eligibility) === 1
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {Number(voter.eligibility) === 1 ? "Eligible" : "Not Eligible"}
      </span>
    </td>

    {/* Status visited / not visited */}
    <td className="px-4 py-2 text-center">

      <select title="visited and not visted"
        value={voter.status}
        onChange={(e) => updateStatus(voter.id, e.target.value)}
        className={`text-start text-white rounded px-2 py-1 text-sm ${getStatusBg(
          voter.status
        )}`}
      >
        <option value="1" className="bg-[#009699]">
          Visited
        </option>
        <option value="0" className="bg-red-500">
          Not Visited
        </option>
      </select>

    </td>

    <td className="px-4 py-3 text-sm text-center">
      <Link
        to="/profile"
        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
      >
        View details
      </Link>
    </td>
  </tr>
))}





// Set Family Grouping Button 

<button
  onClick={handleSubmitSelected}
  className="mt-4 px-4 py-2 bg-[#009699] text-white rounded-lg"
>
  Save Family Grouping
  
</button>
