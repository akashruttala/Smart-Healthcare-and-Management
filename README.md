<img width="2114" height="1125" alt="image" src="https://github.com/user-attachments/assets/3adf9f73-ef73-4f8b-88ee-4c039b376ca4" /># 🏥 Smart Healthcare and Management System (AI Powered)

A full-stack healthcare application built to simplify patient management, appointment scheduling, and record handling. It also includes an AI chatbot to assist users with quick guidance and system navigation.

---

## 🚀 Features

### 👨‍⚕️ Patient

* Secure signup and login using JWT authentication
* Book, view, and manage appointments
* Access personal medical records and history
* Interact with AI chatbot for basic health guidance

### 🩺 Doctor

* View scheduled appointments
* Manage patient details and medical records
* Update reports and treatment information

### 🛠️ Admin

* Manage patients and doctors
* View system data through dashboards and charts
* Monitor overall appointment activity

### 🤖 AI Chatbot 🔥

* Answers general healthcare-related questions
* Helps users navigate the application
* Provides quick responses to user queries
* Integrated using Google Gemini API

---

## 🧠 Tech Stack

### Frontend

* React.js
* Bootstrap
* Axios

### Backend

* Spring Boot
* Spring Security (JWT Authentication)
* REST APIs

### Database

* MySQL
* Hibernate / JPA

### AI Integration

* Google Gemini API

---

## 🏗️ Architecture

Frontend (React) → Backend (Spring Boot APIs) → MySQL Database
→ AI Chatbot (Gemini API)

---

## 🔐 Security

* JWT-based authentication
* Role-based access (Admin, Doctor, Patient)
* Secure communication between client and server

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/akashruttala/Smart-Healthcare-and-Management.git
cd Smart-Healthcare-and-Management
```

---

### 2️⃣ Backend setup

```bash
cd backend
```

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/healthcare
spring.datasource.username=root
spring.datasource.password=your_password

gemini.api.key=YOUR_API_KEY
```

Run the Spring Boot application.

---

### 3️⃣ Frontend setup

```bash
cd frontend
npm install
npm start
```


## 📸 Screenshots
Patient Signin
<img width="2114" height="1095" alt="image" src="https://github.com/user-attachments/assets/69dd4ab4-5d1e-4ec2-be7a-0e3ed838eedb" />
Patient Dashboard
<img width="2129" height="1288" alt="image" src="https://github.com/user-attachments/assets/55fd328c-d1b8-4420-8e39-c484cc56ba3a" />
Book Appointment
<img width="2086" height="1094" alt="image" src="https://github.com/user-attachments/assets/0f857ab1-b8c1-4f0a-aec8-9592470b6c11" />
My Appointments
<img width="2105" height="904" alt="image" src="https://github.com/user-attachments/assets/4976828b-7154-40a8-bc6c-72b0a68f2e25" />
Doctor Signin
<img width="2103" height="1098" alt="image" src="https://github.com/user-attachments/assets/62d54900-96a7-40fc-a4ad-b7843f6916d3" />
Doctor Dashboard
<img width="2107" height="1124" alt="image" src="https://github.com/user-attachments/assets/87a29510-f646-495e-a088-e2b4b78ffe97" />

---

## 🚀 Future Improvements

* Email or SMS notifications
* Doctor availability scheduling
* Smarter AI-based suggestions
* Cloud deployment

---

## 🧠 What I Learned

* Building full-stack applications (React + Spring Boot)
* Designing REST APIs
* Implementing authentication and security
* Integrating AI into real-world applications

---

## 👨‍💻 Author

**Akash Ruttala**
📧 [ruttalaakash2@gmail.com](mailto:ruttalaakash2@gmail.com)
🔗 LinkedIn | GitHub

---

## ⭐ Support

If you found this useful, consider giving it a ⭐
