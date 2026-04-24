import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>

        <Navbar.Brand as={Link} to="/patient">
          Smart HealthCare
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <Nav.Link as={Link} to="/patient">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/viewappointments">
              View Appointments
            </Nav.Link>

            <Nav.Link as={Link} to="/precautions">
              Precautions
            </Nav.Link>

          </Nav>

          <Nav>
            <NavDropdown title="Profile" id="basic-nav-dropdown" align="end">
              <NavDropdown.Item as={Link} to="/profile">View Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} className="text-danger">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}