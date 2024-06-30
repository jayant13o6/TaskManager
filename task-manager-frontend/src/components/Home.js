import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/register">SignUp</Link>
      <br />
      <Link to="/login">Login</Link>
      {/* <br />
      <Link to="/tasks">View Tasks</Link> */}
    </div>
  );
};

export default Home;
