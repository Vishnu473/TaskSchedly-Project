const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ["pending","active", "completed"], 
    default: "pending" 
  },
  recurring: {
    isRecurring: { type: Boolean, default: false },
    type: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      default: "weekly",
    },
    days: {
      type: [String],
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      default: [],
    },
  },
  scheduledFor: { type: Date }
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },
},
{ 
  timestamps: true //This will automatically handle createdAt and updatedAt by mondoDb
});

const Todo = model("taskschedlies", todoSchema);

module.exports = Todo;
