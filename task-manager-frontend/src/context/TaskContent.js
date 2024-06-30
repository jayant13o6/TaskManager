import React, { createContext, useReducer } from "react";
import axios from "axios";

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case "GET_TASKS":
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const initialState = {
    tasks: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  const getTasks = async () => {
    setLoading();
    const res = await axios.get(`${process.env.REACT_APP_HOST_URL}/api/tasks`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch({
      type: "GET_TASKS",
      payload: res.data,
    });
  };

  const addTask = async (task) => {
    const res = await axios.post(
      `${process.env.REACT_APP_HOST_URL}/api/tasks`,
      task,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    dispatch({
      type: "ADD_TASK",
      payload: res.data,
    });
  };

  const updateTask = async (id, updateTask) => {
    console.log("updateTAsk::", updateTask);
    const res = await axios.put(
      `${process.env.REACT_APP_HOST_URL}/api/tasks/${id}`,
      updateTask,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    dispatch({
      type: "UPDATE_TASK",
      payload: res.data,
    });
  };
  const deleteTask = async (id) => {
    await axios.delete(`${process.env.REACT_APP_HOST_URL}/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  };

  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        loading: state.loading,
        getTasks,
        addTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
