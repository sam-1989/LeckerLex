import React, { useState } from "react";

export default function ProfileWelcomePage() {
  // States für das Modal, Profilbild und Formular
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // State für das Profilbild
  const [activeTab, setActiveTab] = useState("welcome"); // Um den aktiven Tab zu steuern
  const [username, setUsername] = useState("Sarah Miller");
  const [email, setEmail] = useState("sarah.miller@example.com");
  const [country, setCountry] = useState("Germany");

  // Funktion zum Öffnen des Modals
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Funktion zum Schließen des Modals
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Funktion zum Öffnen des Dateiauswahlfensters
  const openFileDialog = () => {
    document.getElementById("fileInput").click();
    closeModal(); // Schließt das Modal, wenn "Yes" geklickt wurde
  };

  // Funktion zum Handhaben der Dateiauswahl
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Hier speichern wir das Bild und zeigen es im Profilbildbereich an
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // Funktion zum Umschalten des aktiven Tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md w-full max-w-4xl">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-gray-50 border-r p-4">
          <div className="flex flex-col items-center">
            {/* Profilbild - Grauer Platzhalter-Kreis */}
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mb-2">
              {/* Wenn ein Bild vorhanden ist, wird es angezeigt */}
              {profileImage ? (
                <img
                  src={profileImage} // Hier wird das Bild angezeigt, das vom Benutzer ausgewählt wurde
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <span className="text-gray-500">No Image</span> // Ansonsten zeigt es einen Text an
              )}
            </div>
            <h2 className="text-sm font-semibold">Sarah Miller</h2>
            <a href="#" className="text-blue-500 text-xs hover:underline">
              View profile
            </a>
            {/* Foto hochladen */}
            <div className="mt-4">
              <button
                className="text-xs px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200 transition"
                onClick={openModal} // Öffnet das Modal, wenn der Button geklickt wird
              >
                Change Photo
              </button>
            </div>
          </div>
          {/* Menu */}
          <ul className="mt-6 space-y-3">
            {[
              { icon: "fas fa-user", label: "Account", action: () => handleTabChange("account") },
              { icon: "fas fa-key", label: "Change Password" },
              { icon: "fas fa-lock", label: "Privacy" },
              { icon: "fas fa-envelope", label: "Notifications" },
              { icon: "fas fa-bell", label: "Web Notifications" },
              { icon: "fas fa-image", label: "My Photos" },
              { icon: "fas fa-trash", label: "Delete Account" },
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-center border border-gray-200 rounded-md p-2 hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
                onClick={item.action || (() => {})}
              >
                <div className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-white">
                  <i className={item.icon}></i>
                </div>
                <div className="ml-2 text-sm text-gray-600 hover:text-white">
                  {item.label}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-6">
          {activeTab === "welcome" && (
            <>
              <h1 className="text-3xl font-semibold text-gray-800 mb-3 text-center">
                Welcome
              </h1>
              <p className="text-gray-600 text-sm text-center">
                This is your profile dashboard. Feel free to explore the menu on the
                left to manage your account, update your settings, or view your
                activity.
              </p>
            </>
          )}

          {activeTab === "account" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Account </h2>
              {/* Username */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600" htmlFor="email">
                  E-Mail Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Country */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600" htmlFor="country">
                  Select Country
                </label>
                <input
                  id="country"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Update Button */}
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                Update Account
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal - Do you want to change the photo? */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Do you want to change the photo?
            </h2>
            <div className="flex space-x-4">
              <button
                onClick={openFileDialog}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Yes
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input for the file dialog */}
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange} // Verarbeitet die Datei und zeigt sie an
      />
    </div>
  );
}






















// import React, { useState } from "react";

// export default function ProfileWelcomePage() {
//   // State für das Modal und das Profilbild
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [profileImage, setProfileImage] = useState(null); // State für das Profilbild

//   // Funktion zum Öffnen des Modals
//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   // Funktion zum Schließen des Modals
//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   // Funktion zum Öffnen des Dateiauswahlfensters
//   const openFileDialog = () => {
//     document.getElementById("fileInput").click();
//     closeModal(); // Schließt das Modal, wenn "Yes" geklickt wurde
//   };

//   // Funktion zum Handhaben der Dateiauswahl
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Hier speichern wir das Bild und zeigen es im Profilbildbereich an
//       const imageUrl = URL.createObjectURL(file);
//       setProfileImage(imageUrl);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
//       <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md w-full max-w-4xl">
//         {/* Sidebar */}
//         <div className="w-full md:w-1/4 bg-gray-50 border-r p-4">
//           <div className="flex flex-col items-center">
//             {/* Profilbild - Grauer Platzhalter-Kreis */}
//             <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mb-2">
//               {/* Wenn ein Bild vorhanden ist, wird es angezeigt */}
//               {profileImage ? (
//                 <img
//                   src={profileImage} // Hier wird das Bild angezeigt, das vom Benutzer ausgewählt wurde
//                   alt="Profile"
//                   className="w-20 h-20 rounded-full object-cover"
//                 />
//               ) : (
//                 <span className="text-gray-500">No Image</span> // Ansonsten zeigt es einen Text an
//               )}
//             </div>
//             <h2 className="text-sm font-semibold">Sarah Miller</h2>
//             <a href="#" className="text-blue-500 text-xs hover:underline">
//               View profile
//             </a>
//             {/* Foto hochladen */}
//             <div className="mt-4">
//               <button
//                 className="text-xs px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200 transition"
//                 onClick={openModal} // Öffnet das Modal, wenn der Button geklickt wird
//               >
//                 Change Photo
//               </button>
//             </div>
//           </div>
//           {/* Menu */}
//           <ul className="mt-6 space-y-3">
//             {[
//               { icon: "fas fa-user", label: "Account" },
//               { icon: "fas fa-key", label: "Change Password" },
//               { icon: "fas fa-lock", label: "Privacy" },
//               { icon: "fas fa-envelope", label: "Notifications" },
//               { icon: "fas fa-bell", label: "Web Notifications" },
//               { icon: "fas fa-image", label: "My Photos" },
//               { icon: "fas fa-trash", label: "Delete Account" },
//             ].map((item, index) => (
//               <li
//                 key={index}
//                 className="flex items-center border border-gray-200 rounded-md p-2 hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
//               >
//                 <div className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-white">
//                   <i className={item.icon}></i>
//                 </div>
//                 <div className="ml-2 text-sm text-gray-600 hover:text-white">
//                   {item.label}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//         {/* Main Content */}
//         <div className="flex-grow p-6">
//           {/* Zentrierter und vergrößerter Welcome-Text */}
//           <h1 className="text-3xl font-semibold text-gray-800 mb-3 text-center">
//             Welcome
//           </h1>
//           <p className="text-gray-600 text-sm text-center">
//             This is your profile dashboard. Feel free to explore the menu on the
//             left to manage your account, update your settings, or view your
//             activity.
//           </p>
//         </div>
//       </div>

//       {/* Modal - Do you want to change the photo? */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">
//               Do you want to change the photo?
//             </h2>
//             <div className="flex space-x-4">
//               <button
//                 onClick={openFileDialog}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md"
//               >
//                 Yes
//               </button>
//               <button
//                 onClick={closeModal}
//                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
//               >
//                 No
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Hidden file input for the file dialog */}
//       <input
//         type="file"
//         id="fileInput"
//         className="hidden"
//         accept="image/*"
//         onChange={handleFileChange} // Verarbeitet die Datei und zeigt sie an
//       />
//     </div>
//   );
// }

