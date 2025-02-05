import React, { useState, useEffect } from "react";
import TaskStatusBar from "../components/TaskStatusBar";
import AddTaskPlaceholder from "../components/addTaskPlaceholder";
import { getTasks } from "../Services/todoApiService";
import ModalTaskForm from "../components/ModalTaskForm";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("all");
  const [msg, setMsg] = useState({});
  const [isModalopen, setIsModelOpen] = useState(false);

  const getTaskData = async () => {
    try {
      const data = await getTasks(status);
      setMsg({ message: data.message, type: "success" });
      setTasks(data.tasksList);
      console.log(data.tasksList);
    } catch (error) {
      setMsg({ message: error.message, type: "error" });
      console.error(error);
    }
  };

  useEffect(() => {
    getTaskData();
  }, [status]);

  return (
    <>
      <div className="flex">
        <TaskStatusBar currentStatus={status} setCurrentStatus={setStatus} />
        <div className="h-screen w-full flex flex-col justify-center items-center">
          <h1>{tasks.length}</h1>
          <AddTaskPlaceholder onClickAddTask={() => setIsModelOpen(true)} />
        </div>
      </div>
      <div>
        {isModalopen && (
          <ModalTaskForm
            closeModal={() => setIsModelOpen(false)}
            refreshTasks={getTaskData}
          />
        )}
      </div>
    </>
  );
};

export default TaskManagement;
