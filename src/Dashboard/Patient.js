import React from "react";
import Header from "../Components/Header";
import FAQ from "../Components/FAQ";
import { useNavigate } from "react-router-dom";
import DoctorsSection from "../Components/DoctorsSection";
import Footer from "../Components/Footer";


function PatientDashboard() {
  const navigate = useNavigate();
  const btnsubmit = () => {
    navigate("/bookappointment");
  }
  return (
    <div>

      <Header/>



      <div className="hero-section text-center mt-5">
      <h1 className="hero-title1">Your Health</h1>
      <h1 className="hero-title2">Our Commitment</h1>

      <p className="hero-desc">
      Access trusted doctors, book appointments seamlessly,<br/>
      and stay informed with essential health precautions<br/>
      all through one smart healthcare platform.
      </p>

      </div>

      <button type="button" class="btn btn-primary me-5" onClick={btnsubmit} >Book Appointment</button>
      <button type="button" class="btn btn-outline-warning">View more</button>

      <DoctorsSection/>
      <FAQ/>
      <Footer/>

    </div>
  );
}

export default PatientDashboard;