import React, { useState } from "react";

const ModalTaskForm = ({ closeModal }) => {
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState("daily");
  const [selectedDays, setSelectedDays] = useState([]);
  const [preset, setPreset] = useState("custom");

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const weekends = ["Sun", "Sat"];

  const updateSelectedDays = (option) => {
    if (option === "all") {
      setSelectedDays([...daysOfWeek]);
    } else if (option === "weekdays") {
      setSelectedDays([...weekdays]);
    } else if (option === "weekends") {
      setSelectedDays([...weekends]);
    } else {
      setSelectedDays([]); // Custom starts empty
    }
    setPreset(option);
  };

  const toggleDaySelection = (day) => {
    let newSelection = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];

    setSelectedDays(newSelection);

    // Automatically set to "custom" if user manually changes selection
    setPreset("custom");
  };

  const submitModalForm = (e) => {
    e.preventDefault();
    console.log({ isRecurring, recurringFrequency, selectedDays });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-lg p-4 shadow-lg max-w-2xl w-full h-5/6 flex flex-col">
        <div className="overflow-y-auto flex-1 p-4 custom-scrollbar">
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Add New Task
          </h1>
          <form onSubmit={submitModalForm}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Title:</label>
                <input
                  type="text"
                  placeholder="Go for a walk"
                  required
                  className="border outline-none border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block font-medium">Due Date:</label>
                <input
                  type="date"
                  required
                  className="border outline-none border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block font-medium">
                Description: <span className="text-gray-400">(Optional)</span>
              </label>
              <textarea
                placeholder="Go for a walk at least 3kms to burn calories."
                className="border outline-none border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Priority:</label>
                <select className="border outline-none border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">Category:</label>
                <select className="border outline-none border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400">
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="learning">Learning</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">Status:</label>
                <div className="flex gap-4">
                  {["Pending", "Completed", "Active"].map((status) => (
                    <label key={status} className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="status"
                        value={status.toLowerCase()}
                      />
                      {status}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium">Scheduled For:</label>
                <input
                  type="date"
                  className="border outline-none border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block font-medium">Recurring Task:</label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="recurring"
                  checked={isRecurring}
                  onChange={() => setIsRecurring(!isRecurring)}
                />
                <label htmlFor="recurring">Enable Recurring</label>
              </div>

              {isRecurring && (
                <div className="mt-2">
                  <label className="block font-medium">Frequency:</label>
                  <select
                    value={recurringFrequency}
                    onChange={(e) => setRecurringFrequency(e.target.value)}
                    className="border outline-none border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>

                  {recurringFrequency === "weekly" && (
                    <div className="mt-2">
                      <label className="block font-medium">Select Days:</label>
                      <select
                        value={preset}
                        onChange={(e) => updateSelectedDays(e.target.value)}
                        className="border outline-none border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="all">All</option>
                        <option value="weekdays">Weekdays (Mon–Fri)</option>
                        <option value="weekends">Weekends (Sat & Sun)</option>
                        <option value="custom">Custom</option>
                      </select>

                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {daysOfWeek.map((day) => (
                          <label key={day} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              value={day}
                              checked={selectedDays.includes(day)}
                              onChange={() => toggleDaySelection(day)}
                            />
                            {day}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalTaskForm;
