import React, { useState } from "react";

export default function PrivacySettings() {
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [emailConsent, setEmailConsent] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  // Funktion zum Bestätigen des Konto-Löschens
  const handleDeleteAccount = () => {
    if (deleteConfirmation === "DELETE") {
      alert("Account deletion confirmed.");
      // Hier könnte eine API-Anfrage zum Löschen des Kontos stehen
    } else {
      alert("Please type 'DELETE' to confirm.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl text-center font-semibold text-gray-800 mt-5 mb-6">
        Delete Account
      </h2>

      {/* Account Deletion Section */}
      <div className="mt-6 p-4 border border-red-100 rounded-lg bg-red-50">
        <h3 className="text-lg font-semibold text-red-700">Deleting Account</h3>
        <p className="text-sm text-red-600">
          Deleting your account will remove all of your information from our
          database. This action cannot be undone.
        </p>
        <div className="mt-4">
          <label
            htmlFor="deleteConfirmation"
            className="block text-sm font-medium text-gray-700"
          >
            To confirm this, type <strong>DELETE</strong>
          </label>
          <input
            id="deleteConfirmation"
            type="text"
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
            placeholder="Type DELETE to confirm"
            className="mt-2 px-3 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <button
          className="mt-4 text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded-full shadow transition-colors duration-200"
          onClick={handleDeleteAccount}
        >
          Confirm Deletion
        </button>
      </div>
    </div>
  );
}

// import React, { useState } from "react";

// export default function PrivacySettings() {
//   const [profileVisibility, setProfileVisibility] = useState("public");
//   const [emailConsent, setEmailConsent] = useState(false);

//   return (
//     <div className="space-y-6">
//       <h2 className="text-xl font-semibold text-gray-800">Privacy Settings</h2>
//       <div className="flex flex-col">
//         <label className="text-sm font-semibold text-gray-600">Profile Visibility</label>
//         <select
//           className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
//           value={profileVisibility}
//           onChange={(e) => setProfileVisibility(e.target.value)}
//         >
//           <option value="public">Public</option>
//           <option value="friends">Friends Only</option>
//           <option value="private">Private</option>
//         </select>
//       </div>
//       <div className="flex items-center">
//         <input
//           type="checkbox"
//           id="emailConsent"
//           checked={emailConsent}
//           onChange={(e) => setEmailConsent(e.target.checked)}
//           className="mr-2"
//         />
//         <label htmlFor="emailConsent" className="text-sm text-gray-600">
//           I agree to receive email updates.
//         </label>
//       </div>
//     </div>
//   );
// }
