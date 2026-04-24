import React, { useMemo, useState, useEffect } from "react";
import DoctorNavbar from "../Navbar/DoctorNavbar";
import { useNavigate } from "react-router-dom";
import api from "../API/api";
import "./Doctor.css";

const schedule = [
  { time: "09:00 AM", task: "Ward Round", type: "Hospital" },
  { time: "10:00 AM", task: "OPD Consultation", type: "Clinic" },
  { time: "01:00 PM", task: "Lunch Break", type: "Personal" },
  { time: "02:30 PM", task: "Tele Consultation", type: "Online" },
  { time: "05:30 PM", task: "Case Review", type: "Admin" },
];

export default function Doctor() {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const profileId = localStorage.getItem('profileId');
    if (!profileId) {
      alert("Please login first.");
      navigate("/doctor-signin");
      return;
    }
    
    api.get(`/appointments/doctor/${profileId}?page=${page}&size=5`)
      .then(res => {
          setAppointments(res.data.content || []);
          setTotalPages(res.data.totalPages || 1);
      })
      .catch(err => console.error("Error fetching appointments:", err));
  }, [navigate, page]);

  const updateStatus = async (id, newStatus) => {
    const apiStatus = newStatus === 'Approved' ? 'ACCEPTED' : (newStatus === 'Rejected' ? 'REJECTED' : 'PENDING');
    try {
        await api.put(`/appointments/${id}/status?status=${apiStatus}`);
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment.id === id
              ? { ...appointment, status: apiStatus }
              : appointment
          )
        );
    } catch(err) {
        console.error(err);
        alert("Failed to update status");
    }
  };

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const displayStatus = appointment.status === 'ACCEPTED' ? 'Approved' : appointment.status === 'REJECTED' ? 'Rejected' : 'Pending';
      const matchesStatus =
        statusFilter === "All" || displayStatus === statusFilter;

      const query = searchText.trim().toLowerCase();
      const patientName = appointment.patient?.name || "";
      const reason = appointment.reason || "";
      const matchesQuery =
        query.length === 0 ||
        patientName.toLowerCase().includes(query) ||
        reason.toLowerCase().includes(query);

      return matchesStatus && matchesQuery;
    });
  }, [appointments, searchText, statusFilter]);

  const totalAppointments = appointments.length;
  const approvedCount = appointments.filter(
    (appointment) => appointment.status === "ACCEPTED"
  ).length;
  const pendingCount = appointments.filter(
    (appointment) => appointment.status === "PENDING"
  ).length;
  const rejectedCount = appointments.filter(
    (appointment) => appointment.status === "REJECTED"
  ).length;

  return (
    <div className="doctor-page">
      <DoctorNavbar />

      <main className="doctor-dashboard container-fluid px-3 px-md-4 py-4">
        <section className="doctor-hero mb-4">
          <div>
            <h2>Welcome back Doctor</h2>
          </div>
          
          <span className="doctor-date-badge">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </section>

        <section className="row g-3 mb-4">
          <div className="col-6 col-lg-3">
            <article className="doctor-stat-card">
              <p className="stat-label">Total Appointments</p>
              <h2 className="stat-value">{totalAppointments}</h2>
            </article>
          </div>
          <div className="col-6 col-lg-3">
            <article className="doctor-stat-card pending">
              <p className="stat-label">Pending</p>
              <h2 className="stat-value">{pendingCount}</h2>
            </article>
          </div>
          <div className="col-6 col-lg-3">
            <article className="doctor-stat-card approved">
              <p className="stat-label">Approved</p>
              <h2 className="stat-value">{approvedCount}</h2>
            </article>
          </div>
          <div className="col-6 col-lg-3">
            <article className="doctor-stat-card rejected">
              <p className="stat-label">Rejected</p>
              <h2 className="stat-value">{rejectedCount}</h2>
            </article>
          </div>
        </section>

        <section className="row g-4">
          <div className="col-xl-8">
            <article className="doctor-card-shell h-100">
              <header className="doctor-card-header">
                <h3 className="mb-0">Patient Appointments</h3>
                <div className="doctor-table-controls">
                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                  >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search patient/reason"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                  />
                </div>
              </header>

              <div className="table-responsive">
                <table className="table doctor-table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Age</th>
                      <th>Date</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.map((appointment) => {
                      const displayStatus = appointment.status === 'ACCEPTED' ? 'Approved' : appointment.status === 'REJECTED' ? 'Rejected' : 'Pending';
                      return (
                      <tr key={appointment.id}>
                        <td>{appointment.patient?.name}</td>
                        <td>{appointment.patient?.age}</td>
                        <td>{new Date(appointment.appointmentDate).toLocaleString()}</td>
                        <td>{appointment.reason}</td>
                        <td>
                          <span
                            className={`status-badge ${displayStatus.toLowerCase()}`}
                          >
                            {displayStatus}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            {appointment.status === 'PENDING' && (
                            <>
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() =>
                                updateStatus(appointment.id, "Approved")
                              }
                            >
                              Approve
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() =>
                                updateStatus(appointment.id, "Rejected")
                              }
                            >
                              Reject
                            </button>
                            </>
                            )}
                          </div>
                        </td>
                      </tr>
                      );
                    })}
                    {filteredAppointments.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          No appointments found for current filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-3 mb-3">
                  <button className="btn btn-outline-primary mx-2 btn-sm" disabled={page === 0} onClick={() => setPage(p => p - 1)}>Previous</button>
                  <span className="mx-3 align-self-center">Page {page + 1} of {totalPages}</span>
                  <button className="btn btn-outline-primary mx-2 btn-sm" disabled={page === totalPages - 1} onClick={() => setPage(p => p + 1)}>Next</button>
                </div>
              )}
            </article>
          </div>

          <div className="col-xl-4">
            <div className="d-grid gap-4">
              <article className="doctor-card-shell">
                <h3>Doctor Profile</h3>
                <ul className="doctor-profile-list mb-0">
                  <li>
                    <span>Name</span>
                    <strong>Doctor</strong>
                  </li>
                  <li>
                    <span>Specialization</span>
                    <strong>General Physician</strong>
                  </li>
                  <li>
                    <span>Experience</span>
                    <strong>10 Years</strong>
                  </li>
                  <li>
                    <span>Availability</span>
                    <strong>9:00 AM - 6:00 PM</strong>
                  </li>
                </ul>
              </article>

              <article className="doctor-card-shell">
                <h3>Today Schedule</h3>
                <ul className="doctor-schedule-list mb-0">
                  {schedule.map((slot) => (
                    <li key={`${slot.time}-${slot.task}`}>
                      <div>
                        <p className="slot-time">{slot.time}</p>
                        <p className="slot-task mb-0">{slot.task}</p>
                      </div>
                      <span className="slot-type">{slot.type}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
