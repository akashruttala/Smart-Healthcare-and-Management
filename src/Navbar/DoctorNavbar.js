import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function DoctorNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
      <Navbar.Brand as={Link} to="/doctor" className="me-4">
        Smart HealthCare
      </Navbar.Brand>
      
      <Navbar.Toggle aria-controls="doctor-navbar-nav" />
      
      <Navbar.Collapse id="doctor-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/doctor" className="text-white me-3">
            Home
          </Nav.Link>
        </Nav>

        <Nav className="ms-auto">
          <NavDropdown title="Profile" id="doctor-nav-dropdown" align="end">
            <NavDropdown.Item as={Link} to="/profile">View Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item className="text-danger" onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}