import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from '../assets/assets';

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin, isLoggedIn } = useContext(AppContent);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight / 2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.succes) {
        setIsLoggedin(false);
        setUserData(false);
        navigate("/");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/send-verify-otp");
      if (data.succes) {
        navigate("/verify-email");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 w-[80%] max-w-6xl px-8 py-4 z-50 rounded-xl transition-all duration-300 ${isScrolled ? 'bg-white text-gray-800 shadow-lg' : 'bg-gradient-to-r from-yellow-300 via-yellow-100 to-blue-50 shadow-md'}`}>
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">TT Recrut System</div>
        <div className="flex space-x-8 font-medium">
          <a href="/" className="hover:underline">Home</a>
          <a href="/jobs" className="hover:underline">Jobs</a>
          <a href="/about" className="hover:underline">About Us</a>
        </div>
        {userData ? (
          <div className="flex items-center space-x-6 ">
            <button onClick={() => navigate('/jobs')} className="px-6 py-2 text-white font-bold rounded-lg bg-yellow-400 shadow-md hover:bg-yellow-500">
              {userData.role === "employer" ? "Add a Job" : "Apply for Job"}
            </button>
            <div className="relative ml-10 group pr-10">
              <div className="w-10 h-10 flex justify-center items-center text-black text-lg font-bold cursor-pointer hover:text-blue-700 transition duration-300">
                <img src={assets.notif} alt="Notification" />
              </div>
              {/* Notification Dropdown */}
              <div className="absolute top-12 right-0 z-10 bg-gray-100 text-black rounded-lg shadow-lg hidden group-hover:flex flex-col group-hover:transition-all">
                <ul className="list-none m-0 p-2 text-sm">
                  <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer rounded-lg">
                    No new notifications
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-10 h-10 flex justify-center items-center rounded-full bg-blue-600 text-white relative group">
              {userData.name[0].toUpperCase()}
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
                <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
                  {!userData.isVerified && (
                    <li onClick={sendVerificationOtp} className="py-1 px-2 hover:bg-gray-200 cursor-pointer">Verify email</li>
                  )}
                  <li onClick={logout} className="py-1 px-2 pr-10 hover:bg-gray-200 cursor-pointer">Logout</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className="bg-yellow-400 text-black px-6 py-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(255,165,0,0.6)] flex items-center gap-2">
          Login 
          <img src={assets.arrow_icon} alt="Arrow" className="w-3 h-3" />
      </button>
      
        
        )}
      </div>
    </nav>
  );
};

export default Navbar;
