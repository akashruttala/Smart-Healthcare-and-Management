import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        Smart HealthCare
      </div>

      <ul className="nav-links">
        <li>Home</li>
        <li>View Appointments</li>
        <li>Prescriptions</li>
      </ul>

      <div className="profile">
        Profile
      </div>

    </nav>
  );
}

export default Navbar;