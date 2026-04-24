import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import api from '../API/api';
import { useNavigate } from 'react-router-dom';

export default function Precautions() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const profileId = localStorage.getItem('profileId');
    if (!profileId) {
      alert("Please login first.");
      navigate("/patient-signin");
      return;
    }
    
    api.get(`/medical-records/patient/${profileId}`)
      .then(res => setRecords(res.data))
      .catch(err => console.error("Error fetching medical records:", err));
  }, [navigate]);

  return (
    <div>
        <Header/>
        <div className="container mt-5" style={{minHeight: "60vh"}}>
          <h2 className="mb-4">Medical History & Precautions</h2>
          {records.length === 0 ? (
            <p className="text-muted">No medical history available.</p>
          ) : (
            <div className="row">
              {records.map(record => (
                <div key={record.id} className="col-md-6 mb-4">
                  <div className="card shadow-sm border-success">
                    <div className="card-header bg-success text-white">
                      <strong>Date:</strong> {new Date(record.recordDate).toLocaleDateString()}
                    </div>
                    <div className="card-body">
                      <p><strong>Doctor:</strong> Dr. {record.doctor.name}</p>
                      <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                      <hr/>
                      <p><strong>Precautions:</strong></p>
                      <p style={{whiteSpace: "pre-line", margin: 0}}>{record.precautions}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Footer/>
    </div>
  )
}
