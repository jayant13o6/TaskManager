import { ObjectId } from "mongodb";
import Task from "../models/task.js";

export const getTasks = async (req, res) => {
  console.log("user:", req.user);
  try {
    // const tasks = await Task.find();
    const tasks = await Task.find({
      user: req.user.id,
    });
    console.log("tasks:", tasks);
    if (!tasks) {
      res.status(400).json({
        success: false,
        message: "something went wrong while fetching tasks ",
      });
    }
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const addTask = async (req, res) => {
  console.log("user for add task:", req.user);
  const { title, description, completed } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      completed,
      user: req.user.id,
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const updateTask = async (req, res) => {
  const { title, description, status, completed } = req.body;

  const taskFields = {};
  if (title) taskFields.title = title;
  if (description) taskFields.description = description;
  if (completed) taskFields.completed = completed;
  if (status) taskFields.status = status;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const deleteTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
