import React, { useState } from "react";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";

export default function BookAppointment() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    gender: "",
    age: "",
    place: "",
    date: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Appointment Booked Successfully");

    setData({
      name: "",
      gender: "",
      age: "",
      place: "",
      date: ""
    });
    navigate("/patient");
  };

  return (
    <div>

      <Header />

      <div className="container d-flex justify-content-center mt-5">

        <div className="card p-4 shadow" style={{width:"500px"}}>

          <h2 className="text-primary text-center mb-4">
            Book Appointment
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={data.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 text-center">
              <label className="form-label d-block">Gender</label>

              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
              /> Male

              <input
                type="radio"
                name="gender"
                value="Female"
                className="ms-3"
                onChange={handleChange}
              /> Female
            </div>

            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-control"
                name="age"
                value={data.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Place</label>
              <input
                type="text"
                className="form-control"
                name="place"
                value={data.place}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Appointment Date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={data.date}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex justify-content-between mt-4">

              <button className="btn btn-primary">
                Book Appointment
              </button>

              <button type="reset" className="btn btn-outline-danger" onClick={() => navigate("/patient")}>
                Cancel
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}