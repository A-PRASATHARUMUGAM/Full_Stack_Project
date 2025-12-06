import React, { useState, useEffect } from "react";
import api from "./api";

const VoterFilter = () => {

  const [search, setSearch] = useState("");
  const [partNo, setPartNo] = useState("");
  const [sectionNo, setSectionNo] = useState("");
  const [status, setStatus] = useState("");
  const [voters, setVoters] = useState([]);

  const fetchVoters = async () => {
    try {
      const res = await api.get("/voters", {
        params: {
          search: search,
          part_no: partNo,
          section_no: sectionNo,
          status: status
        }
      });

      setVoters(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch when any filter changes
  useEffect(() => {
    fetchVoters();
  }, [search, partNo, sectionNo, status]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Voter Filter</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by voter id or name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Part No */}
      <select value={partNo} onChange={(e) => setPartNo(e.target.value)}>
        <option value="">Select Part No</option>
        <option value="1">Part 1</option>
        <option value="2">Part 2</option>
        <option value="6">Part 6</option>
      </select>

      {/* Section No */}
      <select value={sectionNo} onChange={(e) => setSectionNo(e.target.value)}>
        <option value="">Select Section No</option>
        <option value="A1">A1</option>
        <option value="A2">A2</option>
      </select>

      {/* Status */}
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select Status</option>
        <option value="1">Visited</option>
        <option value="0">Not Visited</option>
      </select>

      <h3>Results: {voters.length}</h3>

      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Voter ID</th>
            <th>Part No</th>
            <th>Section No</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {voters.map((voter) => (
            <tr key={voter.id}>
              <td>{voter.e_name}</td>
              <td>{voter.voter_id_no}</td>
              <td>{voter.part_no}</td>
              <td>{voter.section_no}</td>
              <td>{voter.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VoterFilter;
