import React from "react";

export default function NotificationsSettings() {
  const handleRefresh = () => {
    // Logic for refreshing or reloading notifications
    alert("Refreshing notifications...");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      {/* Notification Icon */}
      <div className="flex items-center justify-center w-24 h-24 bg-blue-100 text-blue-500 rounded-full">
        <i className="fas fa-bell text-4xl"></i>
      </div>

      {/* Heading */}
      <h1 className="text-xl font-semibold text-gray-800">No notifications yet</h1>

      {/* Description */}
      <p className="text-gray-800 text-center">
        When you get notifications, they'll show up here.
      </p>

      {/* Refresh Button */}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        onClick={handleRefresh}
      >
        Refresh
      </button>
    </div>
  );
}