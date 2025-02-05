import React from "react";
import { useTask } from "../Context/TaskProvider";

const TaskDetailsForm = () => {
  const { task, setTask } = useTask();

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split("T")[0];

    // Don't allow past dates
    if (selectedDate < today) {
      alert("Please select a future date");
      return;
    }

    setTask({ ...task, actualDueDate: selectedDate });
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setTask({ ...task, title: title });
  };

  const handleDescriptionChange = (e) => {
    // Limit description length to a reasonable size (e.g., 500 characters)
    const description = e.target.value.slice(0, 500);
    setTask({ ...task, description });
  };

  return (
    <>
      <div className="">
        <div>
          <label className="block font-medium mb-1">
            Title: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={task.title}
            onChange={handleTitleChange} // Handle trailing spaces on blur
            placeholder="Go for a walk"
            required
            maxLength={100}
            className="border outline-none border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="mt-4 mb-2">
        <label className="block font-medium mb-1">
          Description: <span className="text-gray-400">(Optional)</span>
        </label>
        <textarea
          value={task.description}
          onChange={handleDescriptionChange}
          placeholder="Go for a walk at least 3kms to burn calories."
          maxLength={500}
          rows={3}
          className="border outline-none border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
        />
        {task.description && (
          <div className="text-sm text-gray-500 mt-1">
            {task.description.length}/500 characters
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block font-medium mb-1">Status:</label>
          <div className="flex gap-4">
            {["pending", "active", "completed"].map((status) => (
              <label key={status} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="status"
                  checked={task.status === status}
                  onChange={() => setTask({ ...task, status })}
                  disabled={
                    task.recurringType !== "none" && status === "completed"
                  }
                />
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Priority:</label>
          <select
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
            className="border outline-none border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Category:</label>
          <select
            value={task.category}
            onChange={(e) => setTask({ ...task, category: e.target.value })}
            className="border outline-none border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="learning">Learning</option>
          </select>
        </div>

        {task.recurringType === "none" && (
          <div>
            <label className="block font-medium mb-1">
              Due Date: <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={task.actualDueDate}
              onChange={handleDateChange}
              required
              min={new Date().toISOString().split("T")[0]}
              className="border outline-none border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default TaskDetailsForm;
