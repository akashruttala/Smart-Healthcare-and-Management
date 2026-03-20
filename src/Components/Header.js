import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>

        <Navbar.Brand as={Link} to="/">
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
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}