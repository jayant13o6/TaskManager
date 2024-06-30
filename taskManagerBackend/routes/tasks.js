import express from "express";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// @route    GET api/tasks
// @desc     Get all users tasks
// @access   Private
router.get("/", auth, getTasks);

// @route    POST api/tasks
// @desc     Add new task
// @access   Private
router.post("/", auth, addTask);

// @route    PUT api/tasks/:id
// @desc     Update task
// @access   Private
router.put("/:id", auth, updateTask);

// @route    DELETE api/tasks/:id
// @desc     Delete task
// @access   Private
router.delete("/:id", auth, deleteTask);

export default router;
