import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../API/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  const [stats, setStats] = useState({ totalPatients: 0, totalDoctors: 0, totalAppointments: 0, pendingAppointments: 0 });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "ADMIN") {
      navigate("/admin-signin");
      return;
    }

    // Fetch summary stats
    api.get("/stats/summary").then(res => setStats(res.data)).catch(err => console.error(err));
    // Fetch global data
    api.get("/admin/patients").then(res => setPatients(res.data)).catch(err => console.error(err));
    api.get("/admin/doctors").then(res => setDoctors(res.data)).catch(err => console.error(err));
    api.get("/admin/appointments").then(res => setAppointments(res.data)).catch(err => console.error(err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const chartData = {
    labels: ['Patients', 'Doctors', 'Appointments', 'Pending Apps'],
    datasets: [{
      label: 'System Overview',
      data: [stats.totalPatients, stats.totalDoctors, stats.totalAppointments, stats.pendingAppointments],
      backgroundColor: ['rgba(59, 130, 246, 0.7)', 'rgba(16, 185, 129, 0.7)', 'rgba(139, 92, 246, 0.7)', 'rgba(245, 158, 11, 0.7)'],
      borderRadius: 6,
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: 'top' }, title: { display: false } },
    scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } }, x: { grid: { display: false } } }
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', minHeight: '100vh', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', background: 'rgba(255,255,255,0.8)', padding: '1.5rem 2rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <div>
          <h1 style={{ margin: 0, color: '#0f172a', fontWeight: '800', fontSize: '1.8rem' }}>Control Center</h1>
          <p style={{ margin: 0, color: '#64748b' }}>System Administrator Dashboard</p>
        </div>
        <button onClick={handleLogout} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: '0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#dc2626'} onMouseLeave={e => e.currentTarget.style.background = '#ef4444'}>
          Logout
        </button>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Patients', value: stats.totalPatients, color: '#3b82f6' },
          { label: 'Total Doctors', value: stats.totalDoctors, color: '#10b981' },
          { label: 'Total Appointments', value: stats.totalAppointments, color: '#8b5cf6' },
          { label: 'Pending Approvals', value: stats.pendingAppointments, color: '#f59e0b' }
        ].map((stat, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.9)', padding: '1.5rem', borderRadius: '16px', borderLeft: `5px solid ${stat.color}`, boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: '#0f172a' }}>{stat.value}</h3>
            <p style={{ margin: 0, color: '#64748b', fontWeight: '500' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #cbd5e1', paddingBottom: '0.5rem' }}>
        {['overview', 'patients', 'doctors', 'appointments'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: 'none', border: 'none', padding: '0.5rem 1rem', fontSize: '1.1rem', fontWeight: activeTab === tab ? '700' : '500', color: activeTab === tab ? '#3b82f6' : '#64748b', cursor: 'pointer', borderBottom: activeTab === tab ? '3px solid #3b82f6' : 'none', textTransform: 'capitalize' }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div style={{ background: 'rgba(255,255,255,0.95)', padding: '2rem', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', minHeight: '400px' }}>
        
        {activeTab === 'overview' && (
          <div>
            <h2 style={{ marginBottom: '1.5rem', color: '#0f172a' }}>System Analytics</h2>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        )}

        {activeTab === 'patients' && (
          <div>
            <h2 style={{ marginBottom: '1.5rem', color: '#0f172a' }}>Patient Directory</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', color: '#475569' }}>
                    <th style={{ padding: '1rem', borderRadius: '8px 0 0 8px' }}>ID</th>
                    <th style={{ padding: '1rem' }}>Name</th>
                    <th style={{ padding: '1rem' }}>Age / Gender</th>
                    <th style={{ padding: '1rem' }}>Location</th>
                    <th style={{ padding: '1rem', borderRadius: '0 8px 8px 0' }}>Username</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '1rem', color: '#64748b' }}>#{p.id}</td>
                      <td style={{ padding: '1rem', fontWeight: '500' }}>{p.name}</td>
                      <td style={{ padding: '1rem' }}>{p.age} / {p.gender}</td>
                      <td style={{ padding: '1rem' }}>{p.place}</td>
                      <td style={{ padding: '1rem', color: '#3b82f6' }}>{p.user?.username}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {patients.length === 0 && <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '2rem' }}>No patients found.</p>}
            </div>
          </div>
        )}

        {activeTab === 'doctors' && (
          <div>
            <h2 style={{ marginBottom: '1.5rem', color: '#0f172a' }}>Doctor Directory</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', color: '#475569' }}>
                    <th style={{ padding: '1rem', borderRadius: '8px 0 0 8px' }}>ID</th>
                    <th style={{ padding: '1rem' }}>Name</th>
                    <th style={{ padding: '1rem' }}>Specialty</th>
                    <th style={{ padding: '1rem' }}>Experience</th>
                    <th style={{ padding: '1rem' }}>Fee</th>
                    <th style={{ padding: '1rem', borderRadius: '0 8px 8px 0' }}>Username</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map(d => (
                    <tr key={d.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '1rem', color: '#64748b' }}>#{d.id}</td>
                      <td style={{ padding: '1rem', fontWeight: '500' }}>{d.name}</td>
                      <td style={{ padding: '1rem' }}>{d.specialty}</td>
                      <td style={{ padding: '1rem' }}>{d.experience} Yrs</td>
                      <td style={{ padding: '1rem', fontWeight: '600', color: '#10b981' }}>${d.consultationFee}</td>
                      <td style={{ padding: '1rem', color: '#3b82f6' }}>{d.user?.username}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {doctors.length === 0 && <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '2rem' }}>No doctors found.</p>}
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div>
            <h2 style={{ marginBottom: '1.5rem', color: '#0f172a' }}>Global Appointment Log</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', color: '#475569' }}>
                    <th style={{ padding: '1rem', borderRadius: '8px 0 0 8px' }}>Appt ID</th>
                    <th style={{ padding: '1rem' }}>Patient</th>
                    <th style={{ padding: '1rem' }}>Doctor</th>
                    <th style={{ padding: '1rem' }}>Date & Time</th>
                    <th style={{ padding: '1rem' }}>Reason</th>
                    <th style={{ padding: '1rem', borderRadius: '0 8px 8px 0' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(a => (
                    <tr key={a.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '1rem', color: '#64748b' }}>#{a.id}</td>
                      <td style={{ padding: '1rem', fontWeight: '500' }}>{a.patient?.name}</td>
                      <td style={{ padding: '1rem', fontWeight: '500' }}>Dr. {a.doctor?.name}</td>
                      <td style={{ padding: '1rem' }}>{new Date(a.appointmentDate).toLocaleString()}</td>
                      <td style={{ padding: '1rem' }}>{a.reason}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ 
                          padding: '0.4rem 0.8rem', 
                          borderRadius: '20px', 
                          fontSize: '0.85rem', 
                          fontWeight: '600',
                          background: a.status === 'CONFIRMED' ? '#d1fae5' : a.status === 'CANCELLED' ? '#fee2e2' : '#fef3c7',
                          color: a.status === 'CONFIRMED' ? '#059669' : a.status === 'CANCELLED' ? '#dc2626' : '#d97706'
                        }}>
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {appointments.length === 0 && <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '2rem' }}>No appointments scheduled.</p>}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
