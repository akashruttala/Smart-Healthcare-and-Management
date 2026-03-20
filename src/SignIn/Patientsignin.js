import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Patientsignin() {

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

    navigate("/patient");   
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">Patient Sign In</h2>

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
        <p>Don't have an account ? <Link to="/patient-signup">signup</Link></p>

        <button class="btn btn-outline-success w-100 mb-2">
          Sign In
        </button>
        <br/>
        <button class="btn btn-outline-success w-100" onClick={()=>navigate("/patient")}>
          Signin as Guest
        </button>

      </form>

    </div>
  );
}