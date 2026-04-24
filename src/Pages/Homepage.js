import React from "react";
import { useNavigate } from "react-router-dom";
import "../SignIn/Auth.css"; // Reuse the glassmorphism styles

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="auth-wrapper">
      <div className="auth-card" style={{ maxWidth: '800px', padding: '4rem 3rem' }}>
        <div className="text-center mb-5">
          <h1 className="auth-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Smart Healthcare Platform
          </h1>
          <p className="auth-subtitle" style={{ fontSize: '1.1rem' }}>
            State-of-the-art medical management for patients and professionals.
          </p>
        </div>

        <div className="row g-4 justify-content-center mt-2">
          <div className="col-md-5">
            <div 
              className="p-4 border rounded shadow-sm text-center" 
              style={{ background: 'rgba(255,255,255,0.6)', transition: 'transform 0.3s', cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <h3 className="mb-3" style={{ color: 'var(--primary-color)' }}>Patient Portal</h3>
              <p className="text-muted mb-4">Book appointments and track your medical history easily.</p>
              <button className="auth-btn m-0" onClick={() => navigate("/patient-signin")}>
                Patient Sign In
              </button>
            </div>
          </div>

          <div className="col-md-5">
            <div 
              className="p-4 border rounded shadow-sm text-center" 
              style={{ background: 'rgba(255,255,255,0.6)', transition: 'transform 0.3s', cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <h3 className="mb-3" style={{ color: 'var(--primary-color)' }}>Doctor Portal</h3>
              <p className="text-muted mb-4">Manage your patients, schedule, and consultations.</p>
              <button className="auth-btn m-0" onClick={() => navigate("/doctor-signin")} style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)' }}>
                Doctor Sign In
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-5 pt-3 border-top" style={{ borderColor: 'var(--border-color)' }}>
          <button 
            className="auth-btn-outline mx-auto" 
            style={{ width: 'auto', padding: '0.6rem 2rem', fontSize: '0.9rem' }}
            onClick={() => navigate("/admin-signin")}
          >
            System Administrator Access
          </button>
        </div>

      </div>
    </div>
  );
}