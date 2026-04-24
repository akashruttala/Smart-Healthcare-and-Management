import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../API/api";

export default function DoctorsSection() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    api.get('/patients/doctors')
      .then(res => setDoctors(res.data))
      .catch(err => console.error("Failed to load doctors", err));
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {doctors.map((doc) => (
          <div key={doc.id} className="col-lg-2 col-md-4 col-sm-6 mb-4">
            <div className="card text-center shadow-sm h-100">
              <img
                src={["Alex", "Robert", "Michael", "drgeneral", "drortho"].some(n => doc.name.includes(n)) ? 
                  "https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg" : 
                  "https://img.freepik.com/free-photo/young-female-doctor-with-stethoscope_1301-7807.jpg"}
                className="card-img-top p-3"
                alt="doctor"
                style={{height:"240px", objectFit:"cover", borderRadius: "20px"}}
              />
              <div className="card-body">
                <h5>{doc.name.split('(')[0].trim()}</h5>
                <p className="text-muted mb-1">{doc.specialty}</p>
                <p className="text-muted">{doc.experience} Years Exp.</p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate("/bookappointment", { state: { doctor: doc } })}
                >Book Appointment
                </button>
                <p className="mt-2">view more</p>
              </div>
            </div>
          </div>
        ))}
        {doctors.length === 0 && <p className="text-muted text-center pt-5">No doctors currently available.</p>}
      </div>
    </div>
  );
}