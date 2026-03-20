import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

export default function Patientsignup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    age: "",
    place: "",
    gender: "",
    comment: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    alert("Signup success");
    
  };

  return (
    <div className="App">
      <h3>Enter your details</h3>

      <form onSubmit={handleSubmit}>
        <label>Name</label><br />
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
        /><br /><br />

        <label>Gender</label><br />
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={data.gender === "male"}
            onChange={handleChange}
          />
          Male
        </label>

        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={data.gender === "female"}
            onChange={handleChange}
          />
          Female
        </label>
        <br /><br />

        <label>Age</label><br />
        <input
          type="number"
          name="age"
          value={data.age}
          onChange={handleChange}
        /><br /><br />

        <label>Place</label><br />
        <input
          type="text"
          name="place"
          value={data.place}
          onChange={handleChange}
        /><br /><br />

        <label>Any Comments</label><br />
        <textarea
          name="comment"
          value={data.comment}
          onChange={handleChange}
          rows="4"
          cols="30"
        /><br /><br />

        <button type="submit" onClick={() => navigate("/patient-signin")}>Sign Up</button>
      </form>
    </div>
  );
}