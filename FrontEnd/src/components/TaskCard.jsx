import React, { useState, useEffect } from "react";
import ModalTaskForm from "./ModalTaskForm";

const TaskCard = ({ task }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="p-4 shadow-lg rounded-md relative  border bg-white">
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
                ? "text-blue-500"
                : "text-green-500"
            }`}
          >
            {task.status}
          </span>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded-sm  hover:bg-blue-600"
          >
            Edit
          </button>
        </div>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black z-50 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
              <input
                name="title"
                value={editedTask.title}
                onChange={handleChange}
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Title"
              />
              <textarea
                name="description"
                value={editedTask.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-md mb-4"
                placeholder="Description"
              />
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskCard;
