import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function DoctorNavbar() {

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">

      {/* Logo */}
      <Link className="navbar-brand me-4 " to="/">
        Smart HealthCare
      </Link>

      {/* Home beside logo */}
      <div className="navbar-nav">
        <Link className="nav-link text-white me-3" to="/doctor">
          Home
        </Link>
      </div>

      {/* Logout at extreme right */}
      <div className="ms-auto">
        <Link className="nav-link text-white" to="/">
          Logout
        </Link>
      </div>

    </nav>

  );

}