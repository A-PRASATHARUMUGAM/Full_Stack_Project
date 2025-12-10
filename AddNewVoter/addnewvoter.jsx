import React, { useState } from 'react';
import Sidebar from "../../components/Sidebar";
import BottomNav from "../../components/BottomNav";
import { Link } from "react-router-dom"; 
// Common Icons
import LangIcon from "../../assets/commonIcons/global_icon.svg";
import ExportIcon from "../../assets/commonIcons/Export.svg";
import MLeftArrow from "../../assets/commonIcons/nav-arrow-left.svg";
// Top Profile Icon
import ProfileIcon from "../../assets/commonIcons/top_profile_icon.svg";

const AddNewVoters = () => {

  // Numeric Inputs
  const [partNumber, setPartNumber] = useState(1);
  const [sectionNumber, setSectionNumber] = useState(1);
  const [familyNumber, setFamilyNumber] = useState(1);
  const [voterAge, setVoterAge] = useState(18);

  // Voter ID
  const [voterId, setVoterId] = useState("");

  // Names
  const [eVoterName, setEVoterName] = useState("");
  const [tVoterName, setTVoterName] = useState("");
  const [eFatherName, setEFatherName] = useState("");
  const [tFatherName, setTFatherName] = useState("");
  const [eRelationShip,setERelationship] = useState("");
  const [tRelationShip,setTRelationship] = useState("");

  // Other fields
  const [houseNumber, setHouseNumber] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const [caste, setCaste] = useState("");
  const [status, setStatus] = useState("");
  const [eligibility, setEligibility] = useState("");

  // Generic number input handler
  const handleInput = (setter, maxLength = 2) => (e) => {
    let val = e.target.value;
    if (val === "") {
      setter("");
      return;
    }
    val = val.replace("-", "").slice(0, maxLength);
    val = Number(val);
    if (isNaN(val) || val < 1) val = 1;
    setter(val);
  };

  // Voter ID handler
  const handleVoterId = (e) => {
    let val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
    setVoterId(val);
  };

  // Name handler (supports English + Tamil + period)
  const handleNameChange = (setter) => (e) => {
    let val = e.target.value.replace(/[^\p{L}\p{M}\s.]/gu, "").slice(0, 100);
    setter(val);
  };

  // House number handler
  const handleHouseNumberChange = (e) => {
    let val = e.target.value.replace(/[^0-9/]/g, "");
    const parts = val.split("/");
    if (parts.length > 2) val = parts[0] + "/" + parts[1];
    val = parts.map(part => part.replace(/^0+/, "")).join(parts.length > 1 ? "/" : "");
    if (val.length > 15) val = val.slice(0, 15);
    setHouseNumber(val);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const voterData = {
      part_number: partNumber,
      section_number: sectionNumber,
      family_number: familyNumber,
      voter_age: voterAge,
      voter_id: voterId,
      e_voter_name: eVoterName,
      t_voter_name: tVoterName,
      e_father_name: eFatherName,
      t_father_name: tFatherName,
      e_relationship: eRelationShip,
      t_relationship: tRelationShip,
      house_number: houseNumber,
      gender,
      religion,
      caste,
      status,
      eligibility
    };

    try {
      const response = await fetch("http://your-laravel-api.test/api/voters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(voterData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Voter added successfully!");
        // Reset all fields
        setPartNumber(1);
        setSectionNumber(1);
        setFamilyNumber(1);
        setVoterAge(18);
        setVoterId("");
        setEVoterName("");
        setTVoterName("");
        setEFatherName("");
        setTFatherName("");
        setERelationship("");
        setTRelationship("");
        setHouseNumber("");
        setGender("");
        setReligion("");
        setCaste("");
        setStatus("");
        setEligibility("");
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex h-full font-poppins">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-[#F6F6F8]">
        <main className="p-3 md:p-4 h-full mb-[10%] md:mb-0">
          {/* Header */}
          <header className="flex justify-between items-center mb-5">
            <div className="flex items-center justify-center">
              <i className="md:hidden"><img src={MLeftArrow} alt="" className="w-6 h-6" /></i>
              <span className="text-xl md:text-2xl font-semibold md:ml-2 ml-2">
                Add New Voters
                <br />
                <p className="text-sm hidden md:block text-gray-500">Quick add new voters</p>
              </span>
            </div>
            {/* Language & Export */}
            <div className="flex justify-evenly w-auto text-md">
              <div className="flex justify-evenly items-center border border-gray-300 bg-[#dde1e4] md:bg-[#009699] text-white rounded-lg py-0 md:px-2 md:mr-6 cursor-pointer px-2">
                <i><img src={LangIcon} className="w-5 h-5" alt="" /></i>
                <select title="select language" className="bg-transparent text-center font-medium md:text-white text-gray-500 focus:outline-none">
                  <option value="English">EN</option>
                  <option value="Tamil">தமிழ்</option>
                </select>
              </div>
              <div id="import_excel_container" className="import_excel_container hidden md:flex justify-center items-center w-auto py-2 px-6 bg-[#009699] text-white rounded-lg cursor-pointer">
                <input type="file" id="fileInput" title="import voter list " accept=".xlsx,.xls" className="hidden" />
                <button title="import_excel-btn" id="fileName" className="text-md">Export</button>
                <i><img src={ExportIcon} alt="" className="h-6 w-6 ml-2" /></i>
              </div>
              <div className="md:hidden ml-2"><i><img src={ProfileIcon} alt="" className="w-8 h-8" /></i></div>
            </div>
          </header>

          <div className="flex items-start justify-center min-h-screen bg-gray-100">
            <form className="w-full bg-white shadow-md rounded-lg p-6 space-y-4" onSubmit={handleSubmit}>
              
              {/* Container 1: Part, Section, Voter ID */}
              <div className="flex flex-wrap md:flex-nowrap gap-4">
                <div className="w-full">
                  <label className="text-gray-600 font-medium">Part Number</label>
                  <input type="number" value={partNumber} onChange={handleInput(setPartNumber)} placeholder="1" required className="w-full mt-1 border-3 border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
                </div>
                <div className="w-full">
                  <label className="text-gray-600 font-medium">Section Number</label>
                  <input type="number" value={sectionNumber} onChange={handleInput(setSectionNumber)} placeholder="1" required className="w-full mt-1 border-3 border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
                </div>
                <div className="w-full">
                  <label className="text-gray-600 font-medium">Voter ID</label>
                  <input type="text" value={voterId} onChange={handleVoterId} placeholder="TNZ1234567" required className="w-full mt-1 border-3 border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
                </div>
              </div>

              {/* Container 2: Name */}
              <div className="flex flex-wrap md:flex-nowrap gap-4">
                <div className="w-full">
                  <label className="text-gray-600 font-medium">Full Name</label>
                  <input type="text" placeholder="K. Lakshmi" value={eVoterName} onChange={handleNameChange(setEVoterName)} required className="w-full mt-1 border-3 border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
                </div>
                <div className="w-full">
                  <label className="text-gray-600 font-bold">பெயர்</label>
                  <input type="text" placeholder="கே. லட்சுமி" value={tVoterName} onChange={handleNameChange(setTVoterName)} className="w-full mt-1 border-3 border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
                </div>
              </div>

              {/* Container 3: Father/Husband Name */}
              <div className="flex flex-wrap md:flex-nowrap gap-4">
                <div className="w-full">
                  <label className="text-gray-600 font-medium">Husband / Father Name</label>
                  <input type="text" placeholder="K. Murugan" value={eFatherName} onChange={handleNameChange(setEFatherName)} required className="w-full mt-1 border-3 border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
                </div>
                <div className="w-full">
                  <label className="text-gray-600 font-bold">கணவன்/ தந்தை பெயர்</label>
                  <input type="text" placeholder="கே. முருகன்" value={tFatherName} onChange={handleNameChange(setTFatherName)} className="w-full mt-1 border-3 border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
                </div>
              </div>

              {/* Container 4: Relationship */}
              <div className="flex flex-wrap md:flex-nowrap gap-4">
                <div className="w-full">
                  <label className="text-gray-600 font-medium">Relationship</label>
                  <input type="text" placeholder="Husband / Father" value={eRelationShip} onChange={handleNameChange(setERelationship)} required className="w-full mt-1 border-3 border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
                </div>
                <div className="w-full">
                  <label className="text-gray-600 font-bold">உறவு</label>
                  <input type="text" placeholder="கணவன்/ தந்தை" value={tRelationShip} onChange={handleNameChange(setTRelationship)} className="w-full mt-1 border-3 border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
                </div>
              </div>

              {/* Container 5: House Number & Age */}
              <div className="flex flex-wrap md:flex-nowrap gap-4">
                <div className="w-full">
                  <label className="text-gray-600 font-medium">House Number</label>
                  <input type="text" placeholder="1/20" value={houseNumber} onChange={handleHouseNumberChange} required className="w-full mt-1 border-3 border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
                </div>
                <div className="w-full">
                  <label className="text-gray-600 font-medium">Age</label>
                  <input type="number" placeholder="Age" value={voterAge} onChange={handleInput(setVoterAge)} required className="w-full mt-1 border-3 border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
                </div>
              </div>

              {/* Container 6: Gender & Religion */}
              <div className="flex flex-wrap md:flex-nowrap gap-4">
                <div className="w-full">
                  <label className="text-gray-600 font-medium">Gender</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} required className='w-full mt-1 border-3 border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300'>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="w-full">
                  <label className="text-gray-600 font-medium">Religion</label>
                  <select value={religion} onChange={(e) => setReligion(e.target.value)} required className='w-full mt-1 border-3 border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300'>
                    <option value="">Select Religion</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Christian">Christian</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              {/* Container 7: Caste & Status */}
              <div className="flex flex-wrap md:flex-nowrap gap-4">
                <div className="w-full">
                  <label className="text-gray-600 font-medium">Caste</label>
                  <select value={caste} onChange={(e) => setCaste(e.target.value)} required className='w-full mt-1 border-3 border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300'>
                    <option value="">Select Caste</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="BC">BC</option>
                    <option value="MBC">MBC</option>
                    <option value="DNC">DNC</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="w-full">
                  <label className="text-gray-600 font-medium">Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} required className='w-full mt-1 border-3 border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300'>
                    <option value="">Select Status</option>
                    <option value="1">Visited</option>
                    <option value="0">Not Visited</option>
                  </select>
                </div>
              </div>

              {/* Container 8: Eligibility & Family Members */}
              <div className="flex flex-wrap md:flex-nowrap gap-4">
                <div className="w-full">
                  <label className="text-gray-600 font-medium">Eligibility</label>
                  <select value={eligibility} onChange={(e) => setEligibility(e.target.value)} required className='w-full mt-1 border-3 border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300'>
                    <option value="">Select Eligibility</option>
                    <option value="1">Eligible</option>
                    <option value="0">Not Eligible</option>
                  </select>
                </div>
                <div className="w-full">
                  <label className="text-gray-600 font-medium">Total Family Members</label>
                  <input type="number" value={familyNumber} onChange={handleInput(setFamilyNumber)} placeholder="4" required className="w-full mt-1 border-3 border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <Link to="/voters" className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Cancel</Link>
                <button type="submit" className="px-4 py-2 bg-[#009699] text-white rounded-md hover:bg-green-400">Save</button>
              </div>

            </form>
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
};

export default AddNewVoters;
