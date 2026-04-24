import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../API/api";

export default function BookAppointment() {
  const navigate = useNavigate();
  const location = useLocation();
  const preSelectedDoctor = location.state?.doctor;

  const [doctors, setDoctors] = useState([]);
  const [data, setData] = useState({
    dateTime: "",
    reason: "",
    issueType: ""
  });

  const issueOptions = [
    { label: "Heart / Cardiovascular", specialty: "Cardiologist" },
    { label: "Skin / Dermatological", specialty: "Dermatologist" },
    { label: "Brain / Neurological", specialty: "Neurologist" },
    { label: "Bone / Joint / Orthopedics", specialty: "Orthopedic" },
    { label: "Child Health / Pediatrics", specialty: "Pediatrician" },
    { label: "Fever / General Checkup", specialty: "General Physician" },
    { label: "Other / Not Sure", specialty: "General Physician" }
  ];

  useEffect(() => {
    // If no doctor was explicitly selected, fetch all doctors to determine auto-assignment
    if (!preSelectedDoctor) {
      api.get('/patients/doctors')
        .then(res => setDoctors(res.data))
        .catch(err => console.error("Failed to load doctors", err));
    }
  }, [preSelectedDoctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let targetDoctor = preSelectedDoctor;

    if (!targetDoctor) {
      if (!data.issueType) {
        alert("Please select the type of issue.");
        return;
      }
      
      const mappedSpecialty = issueOptions.find(o => o.label === data.issueType)?.specialty || "General Physician";
      
      const match = doctors.find(d => d.specialty === mappedSpecialty);
      if (match) {
        targetDoctor = match;
      } else {
        // Fallback to General Physician or first available if no perfect match
        const fallback = doctors.find(d => d.specialty === "General Physician") || doctors[0];
        targetDoctor = fallback;
      }
    }

    if (!targetDoctor) {
        alert("No doctor is currently available to handle this request. Please try again later.");
        return;
    }
    
    const profileId = localStorage.getItem('profileId');
    if (!profileId || profileId === "undefined" || profileId === "null") {
        alert("You must be logged in as a patient to book an appointment.");
        navigate("/patient-signin");
        return;
    }

    try {
        await api.post('/appointments/book', {
            patientId: profileId,
            doctorId: targetDoctor.id,
            date: data.dateTime + ":00",
            reason: data.issueType ? `${data.issueType} - ${data.reason}` : data.reason
        });
        alert(`Appointment Booked Successfully with Dr. ${targetDoctor.name} (${targetDoctor.specialty})`);
        navigate("/patient");
    } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || err.response?.data || "Failed to book appointment. Double check the time slot.");
    }
  };

  return (
    <div>
      <Header />
      <div className="container d-flex justify-content-center mt-5">
        <div className="card p-4 shadow" style={{width:"500px"}}>
          <h2 className="text-primary text-center mb-4">Book Appointment</h2>
          
          {preSelectedDoctor ? (
            <h5 className="text-center mb-3 text-muted">with Dr. {preSelectedDoctor.name} ({preSelectedDoctor.specialty})</h5>
          ) : (
            <p className="text-center text-muted mb-3">Select your issue, and we will route you to the best specialist.</p>
          )}

          <form onSubmit={handleSubmit}>
            
            {!preSelectedDoctor && (
              <div className="mb-3">
                <label className="form-label">Type of Issue <span className="text-danger">*</span></label>
                <select className="form-select" name="issueType" value={data.issueType} onChange={handleChange} required>
                  <option value="" disabled>Select the type of issue...</option>
                  {issueOptions.map((option, idx) => (
                    <option key={idx} value={option.label}>{option.label}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Specific Details / Reason (Optional)</label>
              <input type="text" className="form-control" name="reason" value={data.reason} onChange={handleChange} placeholder="Any specific details?" />
            </div>

            <div className="mb-3">
              <label className="form-label">Appointment Time <span className="text-danger">*</span></label>
              <input type="datetime-local" className="form-control" name="dateTime" value={data.dateTime} onChange={handleChange} required />
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button type="submit" className="btn btn-primary">Book Appointment</button>
              <button type="button" className="btn btn-outline-danger" onClick={() => navigate("/patient")}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}