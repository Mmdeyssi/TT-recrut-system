import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Login from './pages/Login';

import EmailVerified from './pages/EmailVerified';
import ResetPassword from './pages/ResetPassword';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import ApplyJob from './pages/ApplyJob';
import Popup from './popup/Popup';
import JobListPage from './pages/JobListPage';



const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home
        />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/verify-email" element={<EmailVerified/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/user" element={<UserDashboard/>} />
        <Route path="/jobs" element={<JobListPage/>} />
        

      </Routes>
      
    </div>
  )
}

export default App
