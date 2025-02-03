import React, { useState } from "react";

export default function AccountSettings() {
  const [username, setUsername] = useState("Sarah Miller");
  const [email, setEmail] = useState("sarah.miller@example.com");
  const [country, setCountry] = useState("Germany");

  const handleSaveChanges = () => {
    alert("Changes have been saved.");
    // Insert API call or other logic to persist changes here.
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#11151E] rounded-3xl shadow-lg p-8">
        <h2 className="text-3xl text-center font-semibold text-white mt-5 mb-6">
          Account Settings
        </h2>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-md font-semibold text-gray-300">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-md font-semibold text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-md font-semibold text-gray-300">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <button
          onClick={handleSaveChanges}
          className="mt-6 w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
