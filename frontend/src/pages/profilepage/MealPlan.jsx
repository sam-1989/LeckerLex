import React, { useState, useEffect } from "react";

// Hilfsfunktion, um eine Woche basierend auf einem Startdatum zu generieren
const getWeekDays = (startDate) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push({
      day: date.toLocaleDateString("en-US", { weekday: "short" }), // z.B. "Thu"
      date: date.getDate(), // Nur das Datum (z.B. 16)
      fullDate: date.toISOString().split("T")[0], // Vollständiges ISO-Datum
    });
  }
  return days;
};

const initialMeals = {
  breakfast: [],
  lunch: [],
  dinner: [],
};

export default function MealPlan() {
  const [currentStartDate, setCurrentStartDate] = useState(new Date()); // Startdatum der Woche
  const [weekDays, setWeekDays] = useState(getWeekDays(new Date())); // Aktuelle Woche
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0] // Standard: heutiges Datum
  );
  const [mealData, setMealData] = useState(
    weekDays.reduce((acc, day) => {
      acc[day.fullDate] = { ...initialMeals };
      return acc;
    }, {})
  );
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [currentMealType, setCurrentMealType] = useState("");
  const [newMeal, setNewMeal] = useState("");

  // Aktualisiert die Woche dynamisch, wenn das Startdatum geändert wird
  useEffect(() => {
    setWeekDays(getWeekDays(currentStartDate));
  }, [currentStartDate]);

  // Funktion zum Hinzufügen einer Mahlzeit
  const handleAddMeal = () => {
    setMealData((prev) => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        [currentMealType]: [...prev[selectedDate][currentMealType], newMeal],
      },
    }));
    setNewMeal("");
    setShowAddMeal(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-3 mt-3">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Meal Plan</h1>

      {/* Navigation für Wochen */}
      <div className="flex items-center justify-between mb-4">
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          onClick={() => {
            const newStartDate = new Date(currentStartDate);
            newStartDate.setDate(currentStartDate.getDate() - 7); // Eine Woche zurück
            setCurrentStartDate(newStartDate);
          }}
        >
          Previous Week
        </button>
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          onClick={() => {
            const newStartDate = new Date(currentStartDate);
            newStartDate.setDate(currentStartDate.getDate() + 7); // Eine Woche vor
            setCurrentStartDate(newStartDate);
          }}
        >
          Next Week
        </button>
      </div>

      {/* Horizontaler Kalender */}
      <div className="flex items-center overflow-x-auto space-x-4 mb-6">
        {weekDays.map((day) => (
          <button
            key={day.fullDate}
            className={`flex flex-col items-center px-4 py-2 rounded-lg ${
              selectedDate === day.fullDate
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedDate(day.fullDate)}
          >
            <span className="text-sm font-semibold">{day.day}</span>
            <span className="text-lg font-bold">{day.date}</span>
          </button>
        ))}
      </div>

      {/* Mahlzeitenanzeige */}
      <div>
        {["breakfast", "lunch", "dinner"].map((mealType) => (
          <div key={mealType} className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 capitalize">
              {mealType}
            </h2>
            {mealData[selectedDate][mealType]?.length > 0 ? (
              <ul className="space-y-2">
                {mealData[selectedDate][mealType].map((meal, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-50 border rounded-lg px-4 py-2"
                  >
                    <span>{meal}</span>
                    <button
                      className="text-sm text-red-500 hover:underline"
                      onClick={() =>
                        setMealData((prev) => ({
                          ...prev,
                          [selectedDate]: {
                            ...prev[selectedDate],
                            [mealType]: prev[selectedDate][mealType].filter(
                              (_, i) => i !== index
                            ),
                          },
                        }))
                      }
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No meals added.</p>
            )}

            {/* Button: + Add Meal */}
            <button
              className="mt-2 text-green-500 hover:text-green-700 text-sm font-semibold"
              onClick={() => {
                setShowAddMeal(true);
                setCurrentMealType(mealType);
              }}
            >
              + Add {mealType}
            </button>
          </div>
        ))}
      </div>

      {/* Add Meal Modal */}
      {showAddMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-md p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Add {currentMealType}
            </h2>
            <input
              type="text"
              placeholder={`Enter ${currentMealType}...`}
              value={newMeal}
              onChange={(e) => setNewMeal(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex justify-end space-x-4">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowAddMeal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={handleAddMeal}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
