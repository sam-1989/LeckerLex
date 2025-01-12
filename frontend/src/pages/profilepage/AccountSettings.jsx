import React, { useState } from "react";

export default function AccountSettings() {
  const [username, setUsername] = useState("Sarah Miller");
  const [email, setEmail] = useState("sarah.miller@example.com");
  const [country, setCountry] = useState("Germany");

  const handleSaveChanges = () => {
    // Logik zum Speichern der Änderungen oder zum Hochladen
    alert("Changes have been saved.");
    // Du könntest hier eine API-Anfrage einfügen, um die Daten zu speichern
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl text-center font-semibold text-gray-800 mt-5 mb-6">Account Settings</h2>
      <div className="flex flex-col">
        <label className="text-md font-semibold text-gray-800">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-md font-semibold text-gray-800">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-md font-semibold text-gray-800">Country</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Button zum Speichern der Änderungen */}
      <button
        onClick={handleSaveChanges}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Save Changes
      </button>
    </div>
  );
}