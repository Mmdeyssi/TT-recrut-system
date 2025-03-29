import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/Login";

import EmailVerified from "./pages/EmailVerified";
import ResetPassword from "./pages/ResetPassword";

//import JobListPage from './pages/JobListPage';
import AboutUs from "./pages/AboutUs";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import JobDescription from "./pages/JobDescription";
import Home from "./pages/Home";
import { AppContent } from "./context/AppContext";

const App = () => {
  const { loading } = useContext(AppContent);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-600 text-lg">
        Loading...
      </div>
    );
  }
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<EmailVerified />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/description/:id" element={<JobDescription />} />
      </Routes>
    </div>
  );
};

export default App;
