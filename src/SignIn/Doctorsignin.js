import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Doctorsignin() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(data);

    alert("Login Successful");

    navigate("/doctor");   
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">Doctor Sign In</h2>

      <form onSubmit={handleSubmit} className="w-50 mx-auto">

        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={data.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>
        <p>Don't have an account ? signin</p>

        <button className="btn btn-outline-success w-100">
          Sign In
        </button>
        <br></br>
        <button className="btn btn-outline-success w-100" onClick={() => navigate("/doctor")}>Guest Sign in</button>

      </form>

    </div>
  );
}