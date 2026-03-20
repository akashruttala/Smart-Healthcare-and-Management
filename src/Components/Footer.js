import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-5 py-4">

      <div className="container">

        <div className="row text-center text-md-start">

          {/* About */}
          <div className="col-md-4 mb-3">
            <h5>Smart HealthCare</h5>
            <p>
              A smart healthcare platform to connect patients with trusted
              doctors, book appointments easily and stay informed with
              essential health precautions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>Home</li>
              <li>View Appointments</li>
              <li>Precautions</li>
              <li>Book Appointment</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-3">
            <h5>Contact</h5>
            <p>Email: healthcare@gmail.com</p>
            <p>Phone: +91 9876543210</p>

            <div>
              <span className="me-3">Instagram</span>
              <span className="me-3">LinkedIn</span>
              <span>X</span>
            </div>
          </div>

        </div>

        <hr className="bg-light" />

        <div className="text-center">
          <p className="mb-0">
            © 2026 Smart HealthCare | Developed by Akash Ruttala
          </p>
        </div>

      </div>

    </footer>
  );
}