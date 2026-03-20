import './App.css';
import { Routes, Route } from 'react-router-dom';

import Homepage from './Pages/Homepage';

import Patientsignin from "./SignIn/Patientsignin";
import Doctorsignin from './SignIn/Doctorsignin';

import Patient from './Dashboard/Patient';
import Doctor from './Dashboard/Doctor';

import ViewAppointments from './Pages/ViewAppointments';
import Profile from './Pages/Profile';
import Precautions from './Pages/Precautions';
import BookAppointment from './Pages/BookAppointment';

import Patientsignup from './Signup/Patientsignup';

// // import Patientsignup from './Signup/Patientsignup';
// import Doctorsignin from './Signin/Doctorsignin';
// import Patientsignin from './Signin/Patientsignin';

// import Patient from './Dashboard/Patient';
// import Doctor from './Dashboard/Doctor';

function App() {
  return (
    <div className="App">
    
      <Routes>
        <Route path="/" element={<Homepage />} /> 
        
        <Route path="/patient-signin" element={<Patientsignin />} />
        <Route path="/doctor-signin" element={<Doctorsignin />} />

        <Route path="/patient" element={<Patient />} />
        <Route path="/doctor" element={<Doctor />} /> 

        <Route path="/viewappointments" element={<ViewAppointments/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/precautions" element={<Precautions />} />
        <Route path="/bookappointment" element={<BookAppointment/>}/>

        <Route path="/patient-signup" element={<Patientsignup />} />

        
        
        {/* <Route path="/patient-signin" element={<Patientsignin />} />
        <Route path="/doctor-signin" element={<Doctorsignin />} />
        <Route path="/patient-signup" element={<Patientsignup />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/doctor" element={<Doctor />} />  */}
      </Routes>
    </div>
  );
}

export default App;