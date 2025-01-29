import React, { useState } from "react";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password do not match!");
      return;
    }
    alert("Password successfully updated!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl text-center font-semibold text-gray-800 mt-5 mb-6">Change Password</h2>
      <div className="flex flex-col">
        <label className="text-md font-semibold text-gray-800" htmlFor="currentPassword">
          Current Password
        </label>
        <input
          id="currentPassword"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-md font-semibold text-gray-800" htmlFor="newPassword">
          New Password
        </label>
        <input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-md font-semibold text-gray-800" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        onClick={handleChangePassword}
      >
        Update Password
      </button>
    </div>
  );
}