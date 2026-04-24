import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../API/api';
import '../SignIn/Auth.css';

export default function Doctorsignup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
    name: "",
    specialty: "",
    experience: "",
    consultationFee: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a payload with correct types based on backend expectations
      const payload = {
        ...data,
        experience: parseInt(data.experience, 10),
        consultationFee: parseFloat(data.consultationFee)
      };
      
      await api.post('/auth/doctor/register', payload);
      alert("Doctor registration successful! You can now login.");
      navigate("/doctor-signin");
    } catch (err) {
      console.error(err);
      if (!err.response) {
          alert("Cannot connect to server. Is the backend running?");
      } else {
          const errorMessage = err.response.data?.message || err.response.data || "Error occurred";
          alert("Signup failed: " + (typeof errorMessage === 'object' ? JSON.stringify(errorMessage) : errorMessage));
      }
    }
  };

  return (
    <div className="auth-wrapper" style={{ padding: '3rem 1rem' }}>
      <div className="auth-card" style={{ maxWidth: '550px' }}>
        <h2 className="auth-title">Doctor Registration</h2>
        <p className="auth-subtitle">Join as a healthcare provider</p>

        <form onSubmit={handleSubmit}>
          
          <div className="row">
            <div className="col-md-6 auth-input-group">
              <label className="auth-input-label">Username</label>
              <input type="text" name="username" className="auth-input" value={data.username} onChange={handleChange} required />
            </div>
            <div className="col-md-6 auth-input-group">
              <label className="auth-input-label">Password</label>
              <input type="password" name="password" className="auth-input" value={data.password} onChange={handleChange} required />
            </div>
          </div>

          <div className="auth-input-group">
            <label className="auth-input-label">Full Name</label>
            <input type="text" name="name" className="auth-input" value={data.name} onChange={handleChange} required />
          </div>

          <div className="auth-input-group">
            <label className="auth-input-label">Specialty</label>
            <input type="text" name="specialty" className="auth-input" value={data.specialty} onChange={handleChange} required placeholder="e.g. Cardiologist, Dentist" />
          </div>

          <div className="row">
            <div className="col-md-6 auth-input-group">
              <label className="auth-input-label">Years of Experience</label>
              <input type="number" name="experience" className="auth-input" value={data.experience} onChange={handleChange} required min="0" />
            </div>
            <div className="col-md-6 auth-input-group">
              <label className="auth-input-label">Consultation Fee ($)</label>
              <input type="number" name="consultationFee" className="auth-input" value={data.consultationFee} onChange={handleChange} required min="0" step="0.01" />
            </div>
          </div>

          <button type="submit" className="auth-btn">Register as Doctor</button>
          
          <p className="auth-link-text">
            Already have an account? 
            <Link to="/doctor-signin" className="auth-link">Sign in</Link>
          </p>

        </form>
      </div>
    </div>
  );
}
