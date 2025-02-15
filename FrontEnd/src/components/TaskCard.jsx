import React, { useState, useEffect } from "react";
import ModalTaskForm from "./ModalTaskForm";
import { deleteTask } from "../Services/todoApiService";

const TaskCard = ({ task, refreshTasks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = () => setIsOpen(true);
  const handleClose = () => setIsDeleteOpen(false);
  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleYes = async() => {
    try {
      console.log("Will be deleted soon....");
      setIsSaving((prev) => !prev);
      //call API
      await deleteTask();
      setTimeout(() => {
        setIsSaving((prev) => !prev);
      }, 5000);
    } catch (error) {}
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
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded-sm  hover:bg-blue-600"
          >
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
                  <div class="gridplace-items-center rounded-lg p-6 lg:overflow-visible">
                    <svg
                      class="text-gray-300 animate-spin"
                      viewBox="0 0 64 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                    >
                      <path
                        d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                        stroke="currentColor"
                        stroke-width="5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                        stroke="currentColor"
                        stroke-width="5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="text-gray-900"
                      ></path>
                    </svg>
                  </div>
                  <p>Processing......</p>
                </div>
              ) : (
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handleYes}
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
      </div>
    </>
  );
};

export default TaskCard;
