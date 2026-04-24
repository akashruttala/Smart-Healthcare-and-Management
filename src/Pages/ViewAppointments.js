import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import api from '../API/api';
import { useNavigate } from 'react-router-dom';

export default function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const profileId = localStorage.getItem('profileId');
    if (!profileId) {
      alert("Please login first.");
      navigate("/patient-signin");
      return;
    }
    
    api.get(`/appointments/patient/${profileId}?page=${page}&size=5`)
      .then(res => {
          setAppointments(res.data.content);
          setTotalPages(res.data.totalPages);
      })
      .catch(err => console.error("Error fetching appointments:", err));
  }, [navigate, page]);

  return (
    <div>
      <Header/>
      <div className="container mt-5" style={{minHeight:"60vh"}}>
        <h2 className="mb-4">My Appointments</h2>
        {appointments.length === 0 ? (
          <p className="text-muted">You have no booked appointments.</p>
        ) : (
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-primary">
              <tr>
                <th>Date</th>
                <th>Doctor</th>
                <th>Specialty</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(app => (
                <tr key={app.id}>
                  <td>{new Date(app.appointmentDate).toLocaleString()}</td>
                  <td>Dr. {app.doctor.name}</td>
                  <td>{app.doctor.specialty}</td>
                  <td>{app.reason}</td>
                  <td>
                    <span className={`badge ${app.status==='PENDING' ? 'bg-warning' : app.status==='ACCEPTED' ? 'bg-success text-white' : 'bg-secondary'}`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-outline-primary mx-2" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</button>
            <span className="mx-3 align-self-center">Page {page + 1} of {totalPages}</span>
            <button className="btn btn-outline-primary mx-2" disabled={page === totalPages - 1} onClick={() => setPage(page + 1)}>Next</button>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  )
}
