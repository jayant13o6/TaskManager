import React, { useState, useContext } from "react";
import TaskContext from "../context/TaskContent";
import "./style.css";
const AddTaskForm = () => {
  const { addTask } = useContext(TaskContext);
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const onChange = (e) => setTask({ ...task, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (task.title && task.description) {
      addTask(task);
      setTask({ title: "", description: "" });
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <form onSubmit={onSubmit} className="addTaskForm">
      <div className="addTaskFormComponents">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={onChange}
        />
      </div>
      <div className="addTaskFormComponents">
        <label>Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={onChange}
        ></textarea>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
