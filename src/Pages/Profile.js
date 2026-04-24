import React from 'react'
import Header from '../Components/Header'
import { Container, Card, Button } from 'react-bootstrap'

export default function Profile() {
  const role = localStorage.getItem('role') || 'Guest';
  const profileId = localStorage.getItem('profileId') || 'Not Set';
  
  return (
    <div>
      <Header/>
      <Container className="mt-5 d-flex justify-content-center">
        <Card className="shadow-lg border-0" style={{ width: '400px', borderRadius: '15px' }}>
          <Card.Header className="bg-primary text-white text-center pb-3 pt-4" style={{ borderRadius: '15px 15px 0 0' }}>
            <h3 className="mb-0">My Profile</h3>
          </Card.Header>
          <Card.Body className="p-4 text-center">
            
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
              alt="Avatar" 
              className="rounded-circle mb-4" 
              style={{ width: '120px', height: '120px', border: '4px solid #f8f9fa' }} 
            />
            
            <h4 className="text-secondary mb-2">{role} ACCOUNT</h4>
            <hr />
            
            <div className="d-flex justify-content-between my-3 px-3">
              <strong>Account Status:</strong>
              <span className="text-success fw-bold">Active</span>
            </div>

            <div className="d-flex justify-content-between my-3 px-3">
              <strong>System ID:</strong>
              <span className="text-muted">#{profileId}</span>
            </div>
            
            <Button variant="outline-primary" className="mt-3 w-100 rounded-pill">
              Edit Details
            </Button>
            
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}
