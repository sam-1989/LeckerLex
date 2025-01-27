import React from "react";

export default function ChangePhoto({ profilePhoto, setProfilePhoto }) {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result); // Profilfoto aktualisieren
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!profilePhoto) {
      alert("Please select an image first!");
      return;
    }
    alert("Profile photo updated successfully!");
  };

  const handleDelete = () => {
    setProfilePhoto(null); // Profilfoto zurücksetzen
    alert("Profile photo deleted successfully!");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl text-center font-semibold text-gray-800 mt-5 mb-6">
        Change Profile Photo
      </h2>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-52 h-52 rounded-full bg-gray-200 flex items-center justify-center">
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Profile Preview"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-gray-500">No Image</span>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="text-MD"
        />
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            onClick={handleUpload}
          >
            Upload Photo
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            onClick={handleDelete}
          >
            Delete Photo
          </button>
        </div>
      </div>
    </div>
  );
}



// import React from "react";

// export default function ChangePhoto({ profilePhoto, setProfilePhoto }) {
//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setProfilePhoto(reader.result); // Profilfoto aktualisieren
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUpload = () => {
//     if (!profilePhoto) {
//       alert("Please select an image first!");
//       return;
//     }
//     alert("Profile photo updated successfully!");
//   };

//   return (
//     <div className="space-y-4">
//       <h2 className="text-3xl text-center font-semibold text-gray-800 mt-5 mb-6">Change Profile Photo</h2>
//       <div className="flex flex-col items-center space-y-4">
//         <div className="w-52 h-52 rounded-full bg-gray-200 flex items-center justify-center">
//           {profilePhoto ? (
//             <img
//               src={profilePhoto}
//               alt="Profile Preview"
//               className="w-full h-full rounded-full object-cover"
//             />
//           ) : (
//             <span className="text-gray-500">No Image</span>
//           )}
//         </div>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="text-MD"
//         />
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//           onClick={handleUpload}
//         >
//           Upload Photo
//         </button>
//       </div>
//     </div>
//   );
// }























