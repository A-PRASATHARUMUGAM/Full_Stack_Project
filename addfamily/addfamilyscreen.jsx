export default function RegistrationForm() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Registration Form
        </h2>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
        />

        {/* Voter ID */}
        <input
          type="text"
          placeholder="Voter ID"
          className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
        />

        {/* Date of Birth */}
        <input
          type="date"
          className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
        />

        {/* Aadhar No */}
        <input
          type="text"
          placeholder="Aadhar Number"
          className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
        />

        {/* Religion */}
        <input
          type="text"
          placeholder="Religion"
          className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
        />

        {/* Mobile No */}
        <input
          type="tel"
          placeholder="Mobile Number"
          className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
        />

        {/* Father's Name */}
        <input
          type="text"
          placeholder="Father's Name"
          className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
        />

        {/* Mother's Name */}
        <input
          type="text"
          placeholder="Mother's Name"
          className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
        />

        {/* Address */}
        <textarea
          placeholder="Address"
          className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
        />

        {/* State */}
        <input
          type="text"
          placeholder="State"
          className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
        />

        {/* Pin Code */}
        <input
          type="text"
          placeholder="Pin Code"
          className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
        />

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}