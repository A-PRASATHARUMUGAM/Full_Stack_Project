import React, { useRef, useState } from "react";
import axios from "axios";
import ImportIcon from "../assets/import.png";

const ExcelImport = () => {

  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState("");


  const handleButtonClick = () => {

    fileInputRef.current.click(); // open file selector

  };

  const handleFileUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return; 

     setSelectedFile(file.name);

     const formData = new FormData();
    formData.append("file", file);
 
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/voters/import", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message || "Import successful!");
    } catch (error) {
      console.error(error);
      alert("Import failed!");
    }
  }; 
 
  return (
    <div
      id="import_excel_container"
      className="import_excel_container hidden md:flex justify-center items-center w-auto py-2 px-6 bg-[#009699] text-white rounded-lg cursor-pointer"
      onClick={handleButtonClick}
    >

      <input
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileUpload}
      />

      <button className="text-md">
        {selectedFile ? selectedFile : "Import Voter List"}
      </button>

      <i>
        <img src={ImportIcon} alt="" className="h-6 w-6 ml-2" />
      </i>
    </div>
  );
};

export default ExcelImport;
