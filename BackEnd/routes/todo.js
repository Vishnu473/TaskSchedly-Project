const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const todo = require("../models/TaskModel");

//get all todo's and also by status
router.get("/", async (req, res) => {
  try {
    const selectedStatus = req.query.selectedStatus?.toLowerCase() || "all";
    if (
      !["all", "completed", "active", "pending"].includes(selectedStatus)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Allowed values: all, completed, active, pending",
      });
    }
    let statusList = [];
    if (selectedStatus === "all") {
      statusList = await todo.find();
    } else {
      statusList = await todo.find({ status: selectedStatus });
    }
    res.status(200).json({
      success: true,
      todos: statusList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//get todo's based on date and selected status
router.get("/:date", async (req, res) => {
  try {
    const { date } = req.params; //Will get the date in the string format as parameter.
    const selectedStatus = req.query.selectedStatus?.toLowerCase() || "all"; // Convert to lowercase and set default to "all"

    // Validate the status
    const validStatuses = ["all", "completed", "active", "pending"];
    if (!validStatuses.includes(selectedStatus)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Allowed values: all, completed, active, pending",
      });
    }
    const parsedDate = new Date(date); //Converting date from string to Date()

    //Checking if param date is a valid dateObject
    if (isNaN(parsedDate)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Date",
      });
    }
    const startOfDay = new Date(parsedDate);
    startOfDay.setHours(0, 0, 0, 0);

    // Set the end of the day (23:59:59.999)
    const endOfDay = new Date(parsedDate);
    endOfDay.setHours(23, 59, 59, 999);

    let query = {
      date: { $gte: startOfDay, $lte: endOfDay }, // Query for the entire day, regardless of time
    };

    if (selectedStatus !== "all") {
      query.status = selectedStatus.toLowerCase();
    }

    const filteredTasks = await todo.find(query);

    if (filteredTasks.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No todo's available for given date and status",
        filteredTasks,
      });
    }
    res.status(200).json({
      success: true,
      filteredTasks,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//add a new todo
router.post("/add", async (req, res) => {
  try {
    const { body } = req;
    const newTask = new todo(body);
    await newTask.save();
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      newTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//update a todo
router.post("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    //Validates if id is correct w.r.t mongodB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }
    const updatedTask = await todo.findByIdAndUpdate(id, body, { new: true });

    if (!updatedTask) {
      return res.status(400).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//schedule a todo
router.post("/schedule/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    //Validates if id is correct w.r.t mongodB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }
    const scheduleTask = new todo(body);

    //Converting currentDate and scheduledFor dates to 12 midNight as user can schedule yesterday's task for today also.
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const scheduledDate = new Date(scheduleTask.scheduledFor);
    scheduledDate.setHours(0, 0, 0, 0);

    //Checking if past date
    const isPastDate = scheduledDate.toISOString() < currentDate.toISOString();
    if (isPastDate) {
      return res.status(400).json({
        success: false,
        message: "Only future dates are allowed for scheduling",
      });
    }

    const scheduledTask = await todo.findByIdAndUpdate(id, body, { new: true });
    if (!scheduledTask) {
      return res.status(400).json({
        success: false,
        message: "Error while scheduling a task. Try again after some time.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task scheduled successfully",
      scheduledTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//delete a todo
router.post("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    //Validates if id is correct w.r.t mongodB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }
    const deletedTask = await todo.findByIdAndDelete(id, body, { new: true });

    if (!deletedTask) {
      return res.status(400).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      deletedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
