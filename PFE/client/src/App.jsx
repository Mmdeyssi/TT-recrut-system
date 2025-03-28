import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";

import EmailVerified from "./pages/EmailVerified";
import ResetPassword from "./pages/ResetPassword";

import UserDashboard from "./pages/UserDashboard";

//import JobListPage from './pages/JobListPage';
import AboutUs from "./pages/AboutUs";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import JobDescription from "./pages/JobDescription";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<EmailVerified />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/description/:id" element={<JobDescription />} />
      </Routes>
    </div>
  );
};

export default App;
