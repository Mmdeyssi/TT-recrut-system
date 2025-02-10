import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Login from './pages/Login';

import EmailVerified from './pages/EmailVerified';
import ResetPassword from './pages/ResetPassword';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';



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
        

      </Routes>
      
    </div>
  )
}

export default App
