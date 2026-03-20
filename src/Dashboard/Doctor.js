import React, { useMemo, useState } from "react";
import DoctorNavbar from "../Navbar/DoctorNavbar";
import "./Doctor.css";

const initialAppointments = [
  {
    id: 1,
    patient: "Akash Sharma",
    age: 21,
    date: "Mar 10, 2026",
    time: "10:00 AM",
    reason: "Fever and fatigue",
    status: "Pending",
  },
  {
    id: 2,
    patient: "Rahul Mehta",
    age: 32,
    date: "Mar 10, 2026",
    time: "11:00 AM",
    reason: "Skin allergy",
    status: "Approved",
  },
  {
    id: 3,
    patient: "Priya Nair",
    age: 27,
    date: "Mar 10, 2026",
    time: "12:30 PM",
    reason: "Migraine follow-up",
    status: "Pending",
  },
  {
    id: 4,
    patient: "Sahil Verma",
    age: 44,
    date: "Mar 11, 2026",
    time: "09:15 AM",
    reason: "Blood pressure check",
    status: "Rejected",
  },
];

const schedule = [
  { time: "09:00 AM", task: "Ward Round", type: "Hospital" },
  { time: "10:00 AM", task: "OPD Consultation", type: "Clinic" },
  { time: "01:00 PM", task: "Lunch Break", type: "Personal" },
  { time: "02:30 PM", task: "Tele Consultation", type: "Online" },
  { time: "05:30 PM", task: "Case Review", type: "Admin" },
];

export default function Doctor() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchText, setSearchText] = useState("");

  const updateStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );
  };

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesStatus =
        statusFilter === "All" || appointment.status === statusFilter;

      const query = searchText.trim().toLowerCase();
      const matchesQuery =
        query.length === 0 ||
        appointment.patient.toLowerCase().includes(query) ||
        appointment.reason.toLowerCase().includes(query);

      return matchesStatus && matchesQuery;
    });
  }, [appointments, searchText, statusFilter]);

  const totalAppointments = appointments.length;
  const approvedCount = appointments.filter(
    (appointment) => appointment.status === "Approved"
  ).length;
  const pendingCount = appointments.filter(
    (appointment) => appointment.status === "Pending"
  ).length;
  const rejectedCount = appointments.filter(
    (appointment) => appointment.status === "Rejected"
  ).length;

  return (
    <div className="doctor-page">
      <DoctorNavbar />

      <main className="doctor-dashboard container-fluid px-3 px-md-4 py-4">
        <section className="doctor-hero mb-4">
          <div>
            <h2>Welcome back Dr. Rakesh</h2>
            {/*5<h1 className="doctor-title mb-1">Doctor Dashboard</h1> */}
            {/* <h5 className="doctor-subtitle mb-0">
              Manage appointments, track schedule, and review your daily
              progress.
            </h5> */}
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
                      <th>Time</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td>{appointment.patient}</td>
                        <td>{appointment.age}</td>
                        <td>{appointment.date}</td>
                        <td>{appointment.time}</td>
                        <td>{appointment.reason}</td>
                        <td>
                          <span
                            className={`status-badge ${appointment.status.toLowerCase()}`}
                          >
                            {appointment.status}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
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
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredAppointments.length === 0 && (
                      <tr>
                        <td colSpan="7" className="text-center py-4">
                          No appointments found for current filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </article>
          </div>

          <div className="col-xl-4">
            <div className="d-grid gap-4">
              <article className="doctor-card-shell">
                <h3>Doctor Profile</h3>
                <ul className="doctor-profile-list mb-0">
                  <li>
                    <span>Name</span>
                    <strong>Dr. Rakesh Kumar</strong>
                  </li>
                  <li>
                    <span>Specialization</span>
                    <strong>General Physician</strong>
                  </li>
                  <li>
                    <span>Experience</span>
                    <strong>12 Years</strong>
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
