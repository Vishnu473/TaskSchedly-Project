const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const tasks = require("../models/taskComplexModel");

router.get("/", async (req, res) => {
  try {
    // Extract all query parameters
    const queryKeys = Object.keys(req.query);

    // Allowed query params
    const allowedParams = ["taskStatus"];

    // Find any unexpected parameters
    const unexpectedParams = queryKeys.filter(
      (key) => !allowedParams.includes(key)
    );

    if (unexpectedParams.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Invalid query parameter(s): ${unexpectedParams.join(
          ", "
        )}. Allowed parameter: taskStatus`,
      });
    }

    const taskStatus = req.query.taskStatus?.toLowerCase() || "all";
    if (!["all", "completed", "active", "pending"].includes(taskStatus)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Allowed values: all, completed, active, pending",
      });
    }
    let statusList = [];
    if (taskStatus === "all") {
      statusList = await tasks.find();
    } else {
      statusList = await tasks.find({ status: taskStatus });
    }
    res.status(200).json({
      success: true,
      tasksList: statusList,
      message: "Tasks fetched sucessfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/add", async (req, res) => {
    try {
      const { body } = req;
      const newTask = new tasks(body);
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

module.exports = router;