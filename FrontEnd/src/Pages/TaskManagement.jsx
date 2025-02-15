import React, { useState, useEffect } from "react";
import TaskStatusBar from "../components/TaskStatusBar";
import AddTaskPlaceholder from "../components/addTaskPlaceholder";
import { getTasks } from "../Services/todoApiService";
import ModalTaskForm from "../components/ModalTaskForm";
import TaskCard from "../components/TaskCard";

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
      <div className="flex flex-col w-full top-16 fixed bottom-11 md:flex-row py-4  shadow-md shadow-white-900">
        <TaskStatusBar currentStatus={status} setCurrentStatus={setStatus} tasknotification={tasks.length}/>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full p-4 overflow-y-auto custom-scrollbar">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} refreshTasks={getTaskData} />
          ))}
          <div className="flex flex-col self-stretch">
            <AddTaskPlaceholder
              onClickAddTask={() => setIsModelOpen(true)}
              className="w-full"
            />
          </div>
        </div>
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
