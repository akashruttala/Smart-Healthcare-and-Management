import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../API/api";
import "./Auth.css";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('profileId', response.data.profileId);
      
      if (response.data.role === 'PATIENT') {
          navigate("/patient");   
      } else if (response.data.role === 'DOCTOR') {
          navigate("/doctor");
      } else if (response.data.role === 'ADMIN') {
          navigate("/admin");
      } else {
          alert('Unknown account type');
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
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your patient portal</p>
        
        <form onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label className="auth-input-label">Username</label>
            <input 
              type="text" 
              name="username" 
              className="auth-input" 
              placeholder="Enter your username"
              value={data.username} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="auth-input-group">
            <label className="auth-input-label">Password</label>
            <input 
              type="password" 
              name="password" 
              className="auth-input" 
              placeholder="Enter your password"
              value={data.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <button type="submit" className="auth-btn">Sign In</button>
          
          <button 
            type="button" 
            className="auth-btn-outline" 
            onClick={() => {
              localStorage.clear();
              navigate("/patient");
            }}
          >
            Continue as Guest
          </button>
          
          <p className="auth-link-text">
            Don't have an account? 
            <Link to="/patient-signup" className="auth-link">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}