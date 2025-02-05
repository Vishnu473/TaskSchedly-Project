import React, { useEffect, useState } from "react";
import { useTask } from "../Context/TaskProvider";

const RecurringTaskForm = () => {
  const { task, setTask } = useTask();

  const [recurrenceSchedule, setRecurrenceSchedule] = useState(task.recurrence);
  
  useEffect(() => {
    let endDate;
    let nextScheduleToDate = "";
    try {
      endDate = calculateEndDate();
      if(task.autoSchedule.autoScheduleIfPending && task.status === "pending"){
        nextScheduleToDate = getNextRecurringDate(task);
      }
    } catch (error) {
      console.error(error.message);
    }
    setTask((prev) => ({
      ...prev,
      recurrence: {
        ...recurrenceSchedule,
        taskRecurrenceEndDate : endDate
      },
      autoSchedule:{
        ...prev.autoSchedule,
        willScheduleToDate : nextScheduleToDate
      }
    }));
  }, [recurrenceSchedule, setTask]);

  const handleMonthlyDayChange = (day) => {
    setRecurrenceSchedule((prev) => ({
      ...prev,
      monthlyDays: prev.monthlyDays.includes(day)
        ? prev.monthlyDays.filter((d) => d !== day)
        : [...prev.monthlyDays, day],
    }));
  };

  const handleWeeklyDayChange = (day) => {
    setRecurrenceSchedule((prev) => ({
      ...prev,
      weeklyDays: prev.weeklyDays.includes(day)
        ? prev.weeklyDays.filter((d) => d !== day)
        : [...prev.weeklyDays, day],
    }));
  };

  const getNextRecurringDate = (task) => {
    try {
      const today = new Date().toISOString().split("T")[0]; // UTC today
      let nextDate = new Date(today);

      switch (task.recurringType) {
        case "daily":
          nextDate.setDate(nextDate.getDate() + 1);
          break;

        case "weekly":
          const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          const todayIndex = new Date(today).getDay();
          const sortedWeeklyDays = recurrenceSchedule.weeklyDays?.sort((a, b) => weekDays.indexOf(a) - weekDays.indexOf(b));
          const nextDay = sortedWeeklyDays?.find(
            (day) => weekDays.indexOf(day) > todayIndex
          );

          if (nextDay) {
            nextDate.setDate(
              new Date(today).getDate() + (weekDays.indexOf(nextDay) - todayIndex)
            );
          } else {
            // If no day found in current week, get first selected day in next week
            const firstSelectedDay = sortedWeeklyDays?.[0];
            nextDate.setDate(
              new Date(today).getDate() +
                (7 - todayIndex + weekDays.indexOf(firstSelectedDay))
            );
          }
          break;

        case "monthly":
          const currentDate = new Date(today).getDate();
          const sortedMonthlyDays = recurrenceSchedule.monthlyDays?.sort((a, b) => a - b);
          const nextDateInMonth = sortedMonthlyDays?.find(
            (day) => day > currentDate
          );

          if (nextDateInMonth) {
            nextDate.setDate(nextDateInMonth);
          } else {
            // Move to next month's first selected date
            nextDate.setMonth(nextDate.getMonth() + 1);
            nextDate.setDate(recurrenceSchedule.monthlyDays[0]);
          }

          // Check if the next date is within the scheduled range
          const toDate = new Date(recurrenceSchedule.taskRecurrenceEndDate);
          if (nextDate > toDate) {
            return null; // No more recurring dates available
          }
          break;

        default:
          return null;
      }
      return nextDate.toISOString().split("T")[0]; // UTC;;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const calculateEndDate = () => {
    try {
      let startDate = new Date(recurrenceSchedule.taskRecurrenceFromDate || new Date().toISOString().split("T")[0]);
      
      switch (task.recurringType) {
        case "daily":
          switch (recurrenceSchedule.dailyDuration) {
            case "1_month":
              startDate.setMonth(startDate.getMonth() + 1);
              break;
            case "3_months":
              startDate.setMonth(startDate.getMonth() + 3);
              break;
            case "6_months":
              startDate.setMonth(startDate.getMonth() + 6);
              break;
            case "1_year":
              startDate.setFullYear(startDate.getFullYear() + 1);
              break;
          }
          break;
        case "weekly":
        case "monthly":
          startDate.setFullYear(startDate.getFullYear() + 1);
          break;
      }

      return startDate.toISOString().split("T")[0]; // UTC;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleFromDateChange = (e) => {
    const fromDate = new Date(e.target.value);
    const maxDate = new Date(fromDate);
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    setRecurrenceSchedule((prev) => ({
      ...prev,
      taskRecurrenceFromDate : e.target.value,
    }))
  };

  return (
    <>
      <div className="mt-4">
        <div className="mt-2 mb-2">
          <label className="block font-medium mb-1">Recurring Task:</label>
          <select
            value={task.recurringType}
            onChange={(e) =>
              setTask({
                ...task,
                recurringType: e.target.value,
                recurrence: {
                  taskRecurrenceFromDate: "",
                  taskRecurrenceEndDate: "",
                  dailyDuration: "",
                  weeklyDays: [],
                  monthlyDays: [],
                },
              })
            }
            className="border outline-none border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
          >
            <option value="none">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <p className="text-sm text-gray-500 my-1">
            {task.recurringType !== "none" && task.recurringType !== "daily"
              ? `${task.recurringType} tasks will be scheduled for **1 year only** with no Due Date.`
              : ``}
          </p>
        </div>
        {task.recurringType !== "none" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mt-2">
              <label className="block font-medium">From:</label>
              <input
                type="date"
                value={recurrenceSchedule.taskRecurrenceFromDate}
                onChange={handleFromDateChange}
                min={new Date().toISOString().split("T")[0]}
                className="border outline-none border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {/* <div className="mt-2">
                <label className="block font-medium">To:</label>
                <input
                  type="date"
                  value={recurrenceSchedule.taskRecurrenceEndDate}
                  onChange={(e) =>
                    setRecurrenceSchedule((prev) => ({
                      ...prev,
                      taskRecurrenceEndDate:e.target.value
                    }))
                  }
                  min={recurrenceSchedule.taskRecurrenceFromDate}
                  max={
                    recurrenceSchedule.taskRecurrenceFromDate
                      ? new Date(
                          new Date(recurrenceSchedule.taskRecurrenceFromDate).setFullYear(
                            new Date(recurrenceSchedule.taskRecurrenceFromDate).getFullYear() + 1
                          )
                        )
                          .toISOString()
                          .split("T")[0]
                      : recurrenceSchedule.taskRecurrenceEndDate
                  }
                  disabled={!recurrenceSchedule.taskRecurrenceFromDate}
                  className="border outline-none border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
                />
              </div> */}
          </div>
        )}
        {task.recurringType === "daily" && (
          <div>
            <label className="block font-medium mb-1">Extend duration:</label>
            <select
              value={recurrenceSchedule.dailyDuration}
              onChange={(e) =>
                setRecurrenceSchedule((prev) => ({
                  ...prev,
                  dailyDuration: e.target.value,
                }))
              }
              className="border outline-none border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select duration</option>
              <option value="1_month">1 Month</option>
              <option value="3_months">3 Months</option>
              <option value="6_months">6 Months</option>
              <option value="1_year">1 Year</option>
            </select>
            <p className="text-sm text-gray-500 my-1">
              {`Daily tasks are scheduled ${
                recurrenceSchedule.dailyDuration === ""
                  ? " default for 1_month"
                  : "now to " + recurrenceSchedule.dailyDuration
              } with no due date.`}
            </p>
          </div>
        )}

        {task.recurringType === "weekly" && (
          <>
            <div className="mt-2">
              <label className="block font-medium">Select Days:</label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <label className="flex items-center gap-2" key={day}>
                      <input
                        type="checkbox"
                        checked={recurrenceSchedule.weeklyDays.includes(day)}
                        onChange={() => handleWeeklyDayChange(day)}
                      />
                      {day}
                    </label>
                  )
                )}
              </div>
            </div>
          </>
        )}

        {task.recurringType === "monthly" && (
          <>
            <div className="mt-2">
              <label className="block font-medium">Select Days of Month:</label>
              <div className="grid grid-cols-7 gap-2 mt-2 ml-2">
                {[...Array(31)].map((_, index) => (
                  <label
                    key={index + 1}
                    className="flex justify-start items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={recurrenceSchedule.monthlyDays.includes(
                        index + 1
                      )}
                      onChange={() => handleMonthlyDayChange(index + 1)}
                    />
                    {index + 1}
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        {task.recurringType !== "none" && (
          <div className="mt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.autoSchedule.autoScheduleIfPending}
                onChange={(e) =>
                  setTask((prev) => ({
                    ...prev,
                    autoSchedule: {
                      ...prev.autoSchedule,
                      autoScheduleIfPending: e.target.checked,
                    },
                  }))
                }
              />
              Auto-schedule if task is pending
            </label>
            {task.autoSchedule.autoScheduleIfPending && (
              <p className="text-sm text-gray-500 mt-2">
                Will automatically set the task to recurring day(next available
                day)
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default RecurringTaskForm;
