import React from "react";
import { useNavigate } from "react-router-dom";

export default function DoctorCard({ doctor }) {

  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/book-appointment", { state: { doctorName: doctor.name } });
  };

  return (
    <div className="col-md-3 mb-4">
      <div className="card text-center shadow-sm h-100">

        <img
          src={doctor.image}
          className="card-img-top p-3"
          alt={doctor.name}
          style={{ height: "200px", objectFit: "cover" }}
        />

        <div className="card-body">

          <h5 className="card-title">{doctor.name}</h5>

          <p className="text-muted mb-1">{doctor.specialization}</p>

          <p className="text-muted">{doctor.experience} Years Experience</p>

          <button
            className="btn btn-primary btn-sm"
            onClick={handleBook}
          >
            Book Appointment
          </button>

          <p className="mt-2 text-primary" style={{ cursor: "pointer" }}>
            view more
          </p>

        </div>
      </div>
    </div>
  );
}