import React, { useContext, useEffect } from "react";
import TaskContext from "../context/TaskContent";
import Task from "./Task";
import AddTaskForm from "./AddTask";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const { tasks, getTasks, loading } = useContext(TaskContext);
  const navigate = useNavigate();
  useEffect(() => {
    getTasks();
  }, []);

  if (loading) {
    return <h4>Loading...</h4>;
  }

  return (
    <div style={{ paddingInline: "10px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>Task List</h2>
        <span
          style={{ paddingRight: "80px", cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          {" <-- Go Home"}
        </span>
      </div>
      <AddTaskForm />
      {tasks?.length > 0 ? (
        tasks?.map((task, index) => (
          <Task key={task._id} task={task} index={index} />
        ))
      ) : (
        <h4>No tasks</h4>
      )}
    </div>
  );
};

export default TaskList;
