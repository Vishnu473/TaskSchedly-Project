import React, { useState } from "react";
import { useTask } from "../Context/TaskProvider";
import TaskDetailsForm from "./TaskDetailsForm";
import RecurringTaskForm from "./RecurringTaskForm";
import { addTask } from "../Services/todoApiService";

const ModalTaskForm = ({ closeModal,refreshTasks }) => {
  const { task, resetTask, setTask } = useTask();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const validateTask = () => {
    if (!task.title.trim()) {
      alert("Please enter a task title");
      return false;
    }

    if (task.recurringType === "none" && !task.actualDueDate) {
      alert("Please select a due date");
      return false;
    }
    if (task.recurringType !== "none") {
      if (
        task.recurringType === "daily" &&
        task.recurrence.dailyDuration === ""
      ) {
        alert("Please select a duration for your daily tasks");
        return false;
      }
      if (
        task.recurringType === "weekly" &&
        task.recurrence.weeklyDays.length === 0
      ) {
        alert("Please select at least one day for weekly recurrence");
        return false;
      }

      if (
        task.recurringType === "monthly" &&
        task.recurrence.monthlyDays.length === 0
      ) {
        alert("Please select at least one date for monthly recurrence");
        return false;
      }
      if (!task.recurrence.taskRecurrenceFromDate) {
        alert("Select the start date of Recurrence");
        return false;
      }
      if (task.status === "completed") {
        alert("Resetting status as you selected Recurrence");
        setTask((prev) => ({ ...prev, status: "pending" }));
        return false;
      }
    }

    return true;
  };

  const onSave = async (task) => {
    try {
      const data = await addTask(task);
      if (data?.success && data?.newTask) {
        setModalMessage(data.message);
      }
    } catch (error) {
      console.error(
        "Error adding task:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (!validateTask()) {
        return;
      }

      setIsSaving(true);
      const finalTask = { ...task };
      await onSave(finalTask);
      resetTask();
      setShowModal(true);
      setTimeout(() => {
        refreshTasks();
        setShowModal(false);
        closeModal();
      }, 5000);

      console.log("Final Task", task);
      
    } catch (error) {
      alert("Error saving task. Please try again.");
      console.error("Error saving task:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    resetTask();
    closeModal();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full h-5/6 flex flex-col">
          <div className="overflow-y-auto flex-1 p-4 custom-scrollbar">
            <h1 className="text-2xl font-semibold mb-4 text-center">
              Add New Task
            </h1>
            <form onSubmit={handleSubmit}>
              <TaskDetailsForm />
              <RecurringTaskForm />
              {showModal && (
                <div className="fixed top-10 right-10 bg-green-500 text-white p-3 rounded-md shadow-md">
                  {modalMessage}
                </div>
              )}
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
              <div className="flex justify-between mt-10">
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`bg-blue-500 text-white px-4 py-2 rounded-md transition-colors ${
                    isSaving
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-600"
                  }`}
                >
                  {isSaving ? "Saving..." : "Add Task"}
                </button>
                <button
                  onClick={handleClose}
                  disabled={isSaving}
                  className="bg-red-500 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalTaskForm;
