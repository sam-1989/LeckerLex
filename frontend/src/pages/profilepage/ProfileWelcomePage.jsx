import React, { useState } from "react";
import ChangePassword from "./ChangePassword";
import PrivacySettings from "./PrivacySettings";
import AccountSettings from "./AccountSettings";
import ShoppingList from "./ShoppingList";
import NotificationsSettings from "./NotificationsSettings"; // Import NotificationsSettings
import MyRecipe from "./MyRecipe"; // Import MyRecipe
import ChangePhoto from "./ChangePhoto"; // Importiere ChangePhoto

export default function ProfileWelcomePage() {
  const [activeTab, setActiveTab] = useState("welcome");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div id="custom-container" className="min-h-screen  flex items-center justify-center font-sans "style={{ marginTop: '-60px' }}>
  {/* Dein Inhalt hier */}
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md w-full max-w-4xl">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-gray-50 border-r p-4">
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center mb-2">
              <span className="text-gray-500">No Image</span>
            </div>
            <h2 className="text-sm font-semibold text-gray-800">Name</h2>
          </div>
          {/* Menu */}
          <ul className="mt-6 space-y-3">
            {[
              { icon: "fas fa-user", label: "Account", action: () => handleTabChange("account") },
              { icon: "fas fa-key", label: "Change Password", action: () => handleTabChange("changePassword") },
              { icon: "fas fa-lock", label: "Privacy", action: () => handleTabChange("privacy") },
              { icon: "fas fa-pen", label: "My shopping list", action: () => handleTabChange("shoppingList") },
              { icon: "fas fa-camera", label: "Change Photo", action: () => handleTabChange("changePhoto") },
              { icon: "fas fa-bell", label: "Notifications", action: () => handleTabChange("notifications") },
              { icon: "fas fa-bell", label: "My Recipe", action: () => handleTabChange("myRecipe") },
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-center border border-gray-200 rounded-md p-2 hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
                onClick={item.action}
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
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-gray-800 mt-5 mb-6">Welcome</h1>
              <p className="text-gray-800 text-sm">
                Explore the menu on the left to manage your account, update settings, or view activity.
              </p>
            </div>
          )}
          {activeTab === "account" && <AccountSettings />}
          {activeTab === "changePassword" && <ChangePassword />}
          {activeTab === "privacy" && <PrivacySettings />}
          {activeTab === "shoppingList" && <ShoppingList />}
          {activeTab === "notifications" && <NotificationsSettings />}
          {activeTab === "myRecipe" && <MyRecipe />}
          {activeTab === "changePhoto" && <ChangePhoto />} {/* Hier einfügen */}
        </div>
      </div>
    </div>
  );
}



















