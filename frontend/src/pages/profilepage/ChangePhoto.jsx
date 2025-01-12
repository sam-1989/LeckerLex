import React, { useState } from "react";

export default function ChangePhoto() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result); // Set the preview of the image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }
    alert("Profile photo updated successfully!");
    // Here you could implement the logic to upload the image to a server
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl text-center font-semibold text-gray-800 mt-5 mb-6">Change Profile Photo</h2>
      <div className="flex flex-col items-center space-y-4">
        {/* Preview Image */}
        <div className="w-52 h-52 rounded-full bg-gray-200 flex items-center justify-center">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Profile Preview"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-gray-500">No Image</span>
          )}
        </div>

        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="text-MD"
        />

        {/* Upload Button */}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          onClick={handleUpload}
        >
          Upload Photo
        </button>
      </div>
    </div>
  );
}