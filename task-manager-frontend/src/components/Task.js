import React, { useContext } from "react";
import TaskContext from "../context/TaskContent";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Task = ({ task, index }) => {
  const navigate = useNavigate();
  const { deleteTask } = useContext(TaskContext);

  return (
    <div>
      <h3>
        {index + 1}: {task?.title}
      </h3>
      <div className="taskDetails">
        <label>Description : </label>
        <p>{task?.description}</p>
      </div>
      <div className="taskDetails">
        <label>status : </label>
        <p>{task?.status}</p>
      </div>
      <div className="taskDetails">
        <label>completed : </label>
        <p>{task?.completed ? "Yes" : "No"}</p>
      </div>
      <button onClick={() => deleteTask(task._id)}>Delete</button>
      <button
        onClick={() => {
          navigate(`/edit-task/${task._id}`);
          // updateTask(task._id)
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default Task;
