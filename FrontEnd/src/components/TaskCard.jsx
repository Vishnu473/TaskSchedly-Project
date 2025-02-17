import React, { useState, useEffect } from "react";
import ModalTaskForm from "./ModalTaskForm";
import { deleteTask } from "../Services/todoApiService";

const TaskCard = ({ task, refreshTasks }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); //is used to color the message
  const [showModal, setShowModal] = useState(false); //show only before closing isDeleteOpen for 3 secs the message after deleting
  const [message, setMessage] = useState(""); //Show error msg or success message after delete

  const handleClose = () => setIsDeleteOpen(false);

  const delteApi = async (id) => {
    setIsSaving((prev) => !prev);
    try {
      const data = await deleteTask(id);
      console.log(data);
      if (data?.success && data?.deletedTask) {
        setMessage(data.message);
        setIsSuccess(true);
      } else {
        setMessage("Unexpected error occurred.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.log(error);
      setMessage(error.message);
      console.error("Error deleting task:", error);
      setIsSuccess(false);
    }

    setIsDeleteOpen(false);
    setShowModal(true);
    refreshTasks();
    setTimeout(() => {
      setShowModal(false);
      setIsSaving((prev) => !prev);
    }, 3000);
  };
  const handleYes = async (id) => {
    try {
      //call API
      await delteApi(id);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleDelete = (id) => {
    setIsDeleteOpen(true);
    console.log(id);
  };

  return (
    <>
      <div className="p-4 shadow-lg h-48 rounded-md relative border bg-white">
        <div>
          <h3 className="text-lg font-semibold line-clamp-1">{task.title}</h3>
          <p className="text-gray-600 mt-1 line-clamp-1">{task.description}</p>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className=" text-gray-500">{task.date}</span>
          <span
            className={`font-semibold ${
              task.status === "pending"
                ? "text-orange-500"
                : task.status === "active"
                ? "text-blue-600"
                : "text-green-500"
            }`}
          >
            {task.status}
          </span>
        </div>
        <div className="flex justify-end mt-4 gap-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-sm  hover:bg-blue-600">
            Edit
          </button>
          <button
            onClick={() => handleDelete(task._id)}
            className="px-4 py-2 bg-red-500 text-white rounded-sm  hover:bg-red-600"
          >
            Delete
          </button>
        </div>
        {isDeleteOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black z-50 bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
              <p className="text-center text-lg">
                Do you really want to delete the task?
              </p>
              <p className="text-center text-md text-gray-400">
                You can't recover this once done.
              </p>
              {isSaving ? (
                <div className="flex justify-center items-center">
                  <p>deleting......</p>
                </div>
              ) : (
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleYes(task._id)}
                    className="px-4 py-1 bg-gray-500 text-white rounded-sm"
                  >
                    Yes
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-4 py-1 bg-gray-500 text-white rounded-sm"
                  >
                    No
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        {showModal && (
          <div
            className={`fixed top-5 right-5 bg-${
              isSuccess ? "green" : "red"
            }-500 shadow-lg p-3 rounded-md`}
          >
            <p
              className={`text-white font-semibold`}
            >
              {message}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskCard;
