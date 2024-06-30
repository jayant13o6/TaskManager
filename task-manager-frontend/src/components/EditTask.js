import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskContext from "../context/TaskContent";

const EditTaskForm = () => {
  const { tasks, updateTask } = useContext(TaskContext);
  const navigate = useNavigate();
  const { id } = useParams();
  //   const history = useHistory();
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
    completed: "",
  });

  useEffect(() => {
    const currentTask = tasks.find((task) => task._id === id);
    if (currentTask) {
      setTask(currentTask);
    }
  }, [id, tasks]);

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    console.log("taskkk:", task);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateTask(id, task);
    navigate("/tasks");
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Title</label>
        {task?.title}
      </div>
      <div>
        <label>Status</label>
        <input
          type="text"
          name="status"
          value={task.status}
          onChange={onChange}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={onChange}
        ></textarea>
      </div>
      <div>
        <label>Completed</label>
        <input
          type="text"
          name="completed"
          value={task.completed}
          onChange={onChange}
        />
      </div>

      <button type="submit">Update Task</button>
    </form>
  );
};

export default EditTaskForm;
