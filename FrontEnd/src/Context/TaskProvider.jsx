import React, { createContext, useContext, useState } from "react";

// Create Context
const TaskContext = createContext();

// Custom Hook for Easy Access
export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    actualDueDate: "",
    priority: "medium",
    status: "pending",
    category: "work",
    recurringType: "none",
    recurrence:{
      dailyDuration:"",
      weeklyDays: [],
      monthlyDays: [],
      taskRecurrenceFromDate:"",
      taskRecurrenceEndDate: ""
    },
    autoSchedule:{
      autoScheduleIfPending: false,
      willScheduleToDate:""
    }
  });

  const resetTask = () => {
    setTask({
      title: "",
      description: "",
      actualDueDate: "",
      priority: "medium",
      status: "pending",
      category: "work",
      recurringType: "none",
      recurrence:{
        dailyDuration:"",
        weeklyDays: [],
        monthlyDays: [],
        taskRecurrenceFromDate:"",
        taskRecurrenceEndDate: ""
      },
      autoSchedule:{
        autoScheduleIfPending: false,
        willScheduleToDate:""
      }
    });
  };

  return (
    <TaskContext.Provider value={{ task, setTask, resetTask }}>
      {children}
    </TaskContext.Provider>
  );
};
