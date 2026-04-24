import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../API/api";
import "./Auth.css";

export default function Adminsignin() {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      
      if (response.data.role === 'ADMIN') {
          navigate("/admin");   
      } else if (response.data.role === 'PATIENT') {
          navigate("/patient");
      } else if (response.data.role === 'DOCTOR') {
          navigate("/doctor");
      } else {
          alert('Unknown account type');
          localStorage.clear();
      }
    } catch (err) {
      console.error(err);
      if (!err.response) {
          alert("Cannot connect to server. Is the backend running?");
      } else {
          const errorMessage = err.response.data?.message || err.response.data || "Invalid credentials";
          alert("Login Failed: " + (typeof errorMessage === 'object' ? JSON.stringify(errorMessage) : errorMessage));
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Admin Portal</h2>
        <p className="auth-subtitle">Restricted Administrative Access</p>
        
        <form onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label className="auth-input-label">Username</label>
            <input type="text" name="username" className="auth-input" value={data.username} onChange={handleChange} required />
          </div>
          <div className="auth-input-group">
            <label className="auth-input-label">Password</label>
            <input type="password" name="password" className="auth-input" value={data.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="auth-btn" style={{ background: '#1f4037' }}>Login to Dashboard</button>
        </form>
      </div>
    </div>
  );
}
