import React from "react";
import { useNavigate } from "react-router-dom";
import akash from "../Images/akash.png"
import gagan from "../Images/gagan.png"
export default function DoctorsSection() {

  const navigate = useNavigate();

  const doctors = [
    { id:1, name:"Dr. Akash", spec:"Cardiologist", exp:"10 Years Experience", img:akash},
    { id:2, name:"Dr. Priya", spec:"Dermatologist", exp:"8 Years Experience", img:"https://img.freepik.com/free-photo/young-female-doctor-with-stethoscope_1301-7807.jpg"},
    { id:3, name:"Dr. Gagan", spec:"Orthopedic", exp:"12 Years Experience", img:gagan},
    { id:4, name:"Dr. Vishnu", spec:"Orthopedic", exp:"12 Years Experience", img:akash},
    { id:5, name:"Dr. Bharath", spec:"Orthopedic", exp:"12 Years Experience", img:gagan},
    { id:6, name:"Dr. Ravi", spec:"Orthopedic", exp:"12 Years Experience", img:akash},
  ];

  return (
    <div className="container mt-5">

      <div className="row">

        {doctors.map((doc) => (
          <div key={doc.id} className="col-lg-2 col-md-4 col-sm-6 mb-4">

            <div className="card text-center shadow-sm h-100">

              <img
                src={doc.img}
                className="card-img-top p-3"
                alt="doctor"
                style={{height:"180px", objectFit:"cover"}}
              />

              <div className="card-body">

                <h5>{doc.name}</h5>

                <p className="text-muted">{doc.spec}</p>

                <p className="text-muted">{doc.exp}</p>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate("/bookappointment")}
                >Book Appointment
                </button>

                <p className="mt-2">view more</p>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}