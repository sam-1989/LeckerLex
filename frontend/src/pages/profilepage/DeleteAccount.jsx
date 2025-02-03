import React, { useState } from "react";

export default function PrivacySettings() {
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  // Function to confirm account deletion
  const handleDeleteAccount = () => {
    if (deleteConfirmation === "DELETE") {
      alert("Account deletion confirmed.");
      // Place API call for account deletion here
    } else {
      alert("Please type 'DELETE' to confirm.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Main Card Container */}
      <div className="w-full max-w-lg bg-[#11151E] rounded-3xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl text-center font-semibold text-orange-50 mt-5 mb-6">
          Delete Account
        </h2>

        {/* Account Deletion Section */}
        <div className="p-4 border border-red-700 rounded-lg bg-red-950">
          <h3 className="text-lg font-semibold text-red-400">Deleting Account</h3>
          <p className="text-sm text-red-300">
            Deleting your account will remove all of your information from our
            database. This action cannot be undone.
          </p>
          <div className="mt-4">
            <label
              htmlFor="deleteConfirmation"
              className="block text-sm font-medium text-gray-300"
            >
              To confirm this, type{" "}
              <strong className="text-red-400">DELETE</strong>
            </label>
            <input
              id="deleteConfirmation"
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="Type DELETE to confirm"
              className="mt-2 px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
            />
          </div>
          <button
            onClick={handleDeleteAccount}
            className="mt-4 w-full text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded-full shadow transition-colors duration-200"
          >
            Confirm Deletion
          </button>
        </div>
      </div>
    </div>
  );
}
