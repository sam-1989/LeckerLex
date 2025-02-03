import React, { useState, useEffect } from "react";

export default function MyCulinaryJournal() {
  const [journalEntries, setJournalEntries] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // get request on mount (empty dependency array)
  useEffect(() => {
    setLoading(true);
    const getJournalHistory = async () => {
      try {
        const response = await fetch("http://localhost:3000/journal/history", {
          credentials: "include",
        });

        if (!response.ok) {
          setError("Failed to fetch journal history.");
        }

        const result = await response.json();
        setJournalEntries(result);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getJournalHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center">
        <p className="text-xl font-bold text-gray-700">
          Reading through your journal...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center">
        <p className="text-xl font-bold text-red-700">{error}</p>
      </div>
    );
  }

  if (journalEntries.length < 1) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center">
        <p className="text-xl font-bold text-gray-700">
          {" "}
          No entries yet! Cook something delicious and share your experience.
        </p>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">
        Savor the Memories: Your Cooking Journey
      </h1>
      {journalEntries.map((entry) => (
        <div
          key={entry._id}
          className="bg-white p-4 shadow-md rounded-lg max-w-md w-full text-center"
        >
          <h2 className="text-xl font-semibold">{entry.recipeName}</h2>
          <img
            className="w-64 h-auto rounded-lg mx-auto my-2"
            src={entry.imageUrl}
            alt="Cooked Dish"
          />
          <p className="text-gray-600">{entry.notes}</p>
        </div>
      ))}
    </div>
  );
}
