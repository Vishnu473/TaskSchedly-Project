const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  actualDueDate: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  status: {
    type: String,
    enum: ["all","pending", "active", "completed"],
    default: "pending",
  },
  category: {
    type: String,
    enum: ["work", "personal", "learning"],
    default: "work",
  },
  recurringType: {
    type: String,
    enum: ["none", "daily", "weekly", "monthly", "yearly"],
    default: "none",
  },
  recurrence: {
    dailyDuration: {
      type: String,
      trim: true,
    },
    weeklyDays: {
      type: [String], // 0 (Sunday) to 6 (Saturday)
      default: [],
    },
    monthlyDays: {
      type: [Number], // 1 to 31 (date of the month)
      default: [],
    },
    taskRecurrenceFromDate: {
      type: Date,
    },
    taskRecurrenceEndDate: {
      type: Date,
    },
  },
  autoSchedule: {
    autoScheduleIfPending: {
      type: Boolean,
      default: false,
    },
    willScheduleToDate: {
      type: Date,
    },
  },
});

module.exports = mongoose.model("Task", TaskSchema);
