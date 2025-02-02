import React, { useState } from "react";

export default function CookingDiary({ recipeName, recipeId }) {
  const [notes, setNotes] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Please select an image to upload!");
      return;
    }
    setSelectedImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      alert("Please select an image to upload!");
      return;
    }

    if (notes.length < 10) {
      alert("Your notes field must be at least 10 characters long!");
      return;
    }

    const formData = new FormData();
    formData.append("imageUrl", selectedImage);
    formData.append("notes", notes);
    formData.append("recipeName", recipeName);
    formData.append("recipeId", recipeId);

    try {
      const response = await fetch("http://localhost:3000/journal", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        console.log("Journal entry successfully saved.");
      } else {
        console.log("Error while creating journal entry.", response);
      }
    } catch (error) {
      console.log("Error while creating journal entry:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Show Off Your Dish!</label>
      <input
        type="file"
        id="imageInput"
        placeholder="Select image"
        onChange={handleImageUpload}
      />
      {selectedImage && (
        <div>
          <img
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
            alt="Preview of the uploaded image"
          />
        </div>
      )}
      <label>How Did It Turn Out?</label>
      <textarea
        rows="5"
        cols="33"
        value={notes}
        placeholder="Share your thoughts..."
        onChange={(e) => setNotes(e.target.value)}
      />
      <button>Add To My Culinary Journal</button>
    </form>
  );
}
