import React, { useState } from "react";
import ChangePassword from "./ChangePassword";
import PrivacySettings from "./PrivacySettings";
import AccountSettings from "./AccountSettings";
import ChangePhoto from "./ChangePhoto";
import welcomeImage from "../../assets/imgforprofile/welcome.png";
import MealPlan from "./MealPlan";

export default function ProfileWelcomePage() {
  const [activeTab, setActiveTab] = useState("welcome");
  const [profilePhoto, setProfilePhoto] = useState(null); // Zustand für das Profilfoto
  const [isMobileView, setIsMobileView] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMobileView(true); // Wechsel in mobilen Modus
  };

  const handleBackToMenu = () => {
    setIsMobileView(false); // Zurück zum Menü
    setActiveTab(""); // Zurücksetzen des aktiven Tabs für die mobile Ansicht
  };

  const renderActiveContent = () => {
    if (isMobileView && activeTab === "") {
      return null; // In der mobilen Ansicht nach Back to Menu keine Welcome-Inhalte anzeigen
    }

    switch (activeTab) {
      case "account":
        return <AccountSettings />;
      case "changePassword":
        return <ChangePassword />;
      case "privacy":
        return <PrivacySettings />;
      case "changePhoto":
        return <ChangePhoto profilePhoto={profilePhoto} setProfilePhoto={setProfilePhoto} />;
      case "mealPlan":
        return <MealPlan />;
      default:
        return (
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-800 mt-5 mb-6">Welcome</h1>
            <p className="text-gray-800 text-sm">
              Explore the menu on the left to manage your account, update settings, or view activity.
            </p>
            <div className="w-60 h-60 rounded-full overflow-hidden flex items-center justify-center mb-2">
              <img
                src={profilePhoto || welcomeImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div
      id="custom-container"
      className="min-h-screen flex items-center justify-center font-sans mt-0 md:mt-[-40px]"
    >
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md w-full max-w-4xl">
        {!isMobileView && (
          <div className="w-full md:w-1/4 bg-gray-50 border-r p-4">
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center mb-2">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </div>
              {isMobileView && activeTab === "welcome" && ( // Nur in mobiler Ansicht und im Welcome-Zustand anzeigen
                <div className="text-center mb-4">
                  <h1 className="text-2xl font-semibold text-gray-800">Welcome</h1>
                  <p className="text-gray-600 text-sm">
                    Explore the menu to manage your account, update settings, or view activity.
                  </p>
                  <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center mt-4">
                    <img
                      src={welcomeImage}
                      alt="Welcome"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              <h2 className="text-sm font-semibold text-gray-800">Name</h2>
            </div>
            <ul className="mt-6 space-y-3">
              {[
                { icon: "fas fa-user", label: "Account", action: () => handleTabChange("account") },
                { icon: "fas fa-key", label: "Change password", action: () => handleTabChange("changePassword") },
                { icon: "fas fa-lock", label: "Privacy", action: () => handleTabChange("privacy") },
                { icon: "fas fa-camera", label: "Change photo", action: () => handleTabChange("changePhoto") },
                { icon: "fas fa-calendar-alt", label: "Meal plan", action: () => handleTabChange("mealPlan") },
              ].map((item, index) => (
                <li
                  key={index}
                  className="w-full flex items-center border border-gray-200 rounded-full p-2 hover:bg-green-500 hover:text-white rounded-l-full transition duration-300 cursor-pointer"
                  onClick={item.action}
                >
                  <div className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-white">
                    <i className={item.icon}></i>
                  </div>
                  <div className="ml-2 text-sm text-gray-600 hover:text-white">{item.label}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex-grow p-6">
          {isMobileView ? (
            <div>
              <button
                onClick={handleBackToMenu}
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
              >
                Back to Menu
              </button>
              {renderActiveContent()}
            </div>
          ) : (
            renderActiveContent()
          )}
        </div>
      </div>
    </div>
  );
}




// import React, { useState } from "react";
// import ChangePassword from "./ChangePassword";
// import PrivacySettings from "./PrivacySettings";
// import AccountSettings from "./AccountSettings";
// import ChangePhoto from "./ChangePhoto";
// import welcomeImage from "../../assets/imgforprofile/welcome.png";
// import MealPlan from "./MealPlan";

// export default function ProfileWelcomePage() {
//   const [activeTab, setActiveTab] = useState("welcome");
//   const [profilePhoto, setProfilePhoto] = useState(null); // Zustand für das Profilfoto
//   const [isMobileView, setIsMobileView] = useState(false);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     setIsMobileView(true); // Wechsel in mobilen Modus
//   };

//   const handleBackToMenu = () => {
//     setIsMobileView(false); // Zurück zum Menü
//     setActiveTab("welcome"); // Zurücksetzen des aktiven Tabs für die mobile Ansicht
//   };

//   const renderActiveContent = () => {
//     switch (activeTab) {
//       case "account":
//         return <AccountSettings />;
//       case "changePassword":
//         return <ChangePassword />;
//       case "privacy":
//         return <PrivacySettings />;
//       case "changePhoto":
//         return <ChangePhoto profilePhoto={profilePhoto} setProfilePhoto={setProfilePhoto} />;
//       case "mealPlan":
//         return <MealPlan />;
//       default:
//         return (
//           <div className="text-center">
//             <h1 className="text-3xl font-semibold text-gray-800 mt-5 mb-6">Welcome</h1>
//             <p className="text-gray-800 text-sm">
//               Explore the menu on the left to manage your account, update settings, or view activity.
//             </p>
//             <div className="w-60 h-60 rounded-full overflow-hidden flex items-center justify-center mb-2">
//               <img
//                 src={profilePhoto || welcomeImage}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <div
//       id="custom-container"
//       className="min-h-screen flex items-center justify-center font-sans mt-0 md:mt-[-40px]"
//     >
//       <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md w-full max-w-4xl">
//         {!isMobileView && (
//           <div className="w-full md:w-1/4 bg-gray-50 border-r p-4">
//             <div className="flex flex-col items-center">
//               <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center mb-2">
//                 {profilePhoto ? (
//                   <img
//                     src={profilePhoto}
//                     alt="Profile"
//                     className="w-full h-full rounded-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-gray-500">No Image</span>
//                 )}
//               </div>
//               <h2 className="text-sm font-semibold text-gray-800">Name</h2>
//             </div>
//             <ul className="mt-6 space-y-3">
//               {[
//                 { icon: "fas fa-user", label: "Account", action: () => handleTabChange("account") },
//                 { icon: "fas fa-key", label: "Change password", action: () => handleTabChange("changePassword") },
//                 { icon: "fas fa-lock", label: "Privacy", action: () => handleTabChange("privacy") },
//                 { icon: "fas fa-camera", label: "Change photo", action: () => handleTabChange("changePhoto") },
//                 { icon: "fas fa-calendar-alt", label: "Meal plan", action: () => handleTabChange("mealPlan") },
//               ].map((item, index) => (
//                 <li
//                   key={index}
//                   className="w-full flex items-center border border-gray-200 rounded-full p-2 hover:bg-green-500 hover:text-white rounded-l-full transition duration-300 cursor-pointer"
//                   onClick={item.action}
//                 >
//                   <div className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-white">
//                     <i className={item.icon}></i>
//                   </div>
//                   <div className="ml-2 text-sm text-gray-600 hover:text-white">{item.label}</div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         <div className="flex-grow p-6">
//           {isMobileView ? (
//             <div>
//               <button
//                 onClick={handleBackToMenu}
//                 className="mb-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
//               >
//                 Back to Menu
//               </button>
//               {renderActiveContent()}
//             </div>
//           ) : (
//             renderActiveContent()
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }























// import React, { useState } from "react";
// import ChangePassword from "./ChangePassword";
// import PrivacySettings from "./PrivacySettings";
// import AccountSettings from "./AccountSettings";
// import ChangePhoto from "./ChangePhoto";
// import welcomeImage from "../../assets/imgforprofile/welcome.png";
// import MealPlan from "./MealPlan";

// export default function ProfileWelcomePage() {
//   const [activeTab, setActiveTab] = useState("welcome");
//   const [profilePhoto, setProfilePhoto] = useState(null); // Zustand für das Profilfoto
//   const [isMobileView, setIsMobileView] = useState(false);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     setIsMobileView(true); // Wechsel in mobilen Modus
//   };

//   const handleBackToMenu = () => {
//     setIsMobileView(false); // Zurück zum Menü
//   };

//   const renderActiveContent = () => {
//     switch (activeTab) {
//       case "account":
//         return <AccountSettings />;
//       case "changePassword":
//         return <ChangePassword />;
//       case "privacy":
//         return <PrivacySettings />;
//       case "changePhoto":
//         return <ChangePhoto profilePhoto={profilePhoto} setProfilePhoto={setProfilePhoto} />;
//       case "mealPlan":
//         return <MealPlan />;
//       default:
//         return (
//           <div className="text-center">
//             <h1 className="text-3xl font-semibold text-gray-800 mt-5 mb-6">Welcome</h1>
//             <p className="text-gray-800 text-sm">
//               Explore the menu on the left to manage your account, update settings, or view activity.
//             </p>
//             <div className="w-60 h-60 rounded-full overflow-hidden flex items-center justify-center mb-2">
//               <img
//                 src={profilePhoto || welcomeImage}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <div
//       id="custom-container"
//       className="min-h-screen flex items-center justify-center font-sans mt-0 md:mt-[-40px]"
//     >
//       <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md w-full max-w-4xl">
//         {!isMobileView && (
//           <div className="w-full md:w-1/4 bg-gray-50 border-r p-4">
//             <div className="flex flex-col items-center">
//               <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center mb-2">
//                 {profilePhoto ? (
//                   <img
//                     src={profilePhoto}
//                     alt="Profile"
//                     className="w-full h-full rounded-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-gray-500">No Image</span>
//                 )}
//               </div>
//               <h2 className="text-sm font-semibold text-gray-800">Name</h2>
//             </div>
//             <ul className="mt-6 space-y-3">
//               {[
//                 { icon: "fas fa-user", label: "Account", action: () => handleTabChange("account") },
//                 { icon: "fas fa-key", label: "Change password", action: () => handleTabChange("changePassword") },
//                 { icon: "fas fa-lock", label: "Privacy", action: () => handleTabChange("privacy") },
//                 { icon: "fas fa-camera", label: "Change photo", action: () => handleTabChange("changePhoto") },
//                 // { icon: "fas fa-bell", label: "My Recipe", action: () => handleTabChange("myRecipe") },
//                 { icon: "fas fa-calendar-alt", label: "Meal plan", action: () => handleTabChange("mealPlan") },
//               ].map((item, index) => (
//                 <li
//                   key={index}
//                   className="w-full flex items-center border border-gray-200 rounded-full p-2 hover:bg-green-500 hover:text-white rounded-l-full transition duration-300 cursor-pointer"
//                   onClick={item.action}
//                 >
//                   <div className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-white">
//                     <i className={item.icon}></i>
//                   </div>
//                   <div className="ml-2 text-sm text-gray-600 hover:text-white">{item.label}</div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         <div className="flex-grow p-6">
//           {isMobileView ? (
//             <div>
//               <button
//                 onClick={handleBackToMenu}
//                 className="mb-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
//               >
//                 Back to Menu
//               </button>
//               {renderActiveContent()}
//             </div>
//           ) : (
//             renderActiveContent()
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
