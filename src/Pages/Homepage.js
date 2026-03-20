import React from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {

  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      
      <h1 className="mb-4">Smart Healthcare Management</h1>
      <p className="mb-5">Choose your login option</p>

      <div className="d-flex justify-content-center gap-4">

        <button 
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/patient-signin")}
        >
          Patient Sign In
        </button>

        <button 
          className="btn btn-success btn-lg"
          onClick={() => navigate("/doctor-signin")}
        >
          Doctor Sign In
        </button>

      </div>

    </div>
  );
}