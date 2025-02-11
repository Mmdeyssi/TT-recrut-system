import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const Navbar = () => {
    const navigate = useNavigate();
    const {userData,backendUrl,setUserData,setIsLoggedin,isLoggedIn} = useContext(AppContent)
    const logout = async()=>{
      try{
        axios.defaults.withCredentials =true
        const {data}=await axios.post(backendUrl + '/api/auth/logout')
        if(data.succes){
          setIsLoggedin(false)
          setUserData(false)
          navigate('/')
          
        }
        
      }catch(err){
        toast.error(err.message)
      }
    }
    const sendverificationOtp = async()=> {
      try{
        axios.defaults.withCredentials =true
        const {data}=await axios.post(backendUrl + '/api/auth/send-verify-otp')
        if(data.succes){
          navigate('/verify-email')
          toast.success(data.message) 

        }else{
          toast.error(data.message)
        }
      }catch(err){
        toast.error(err.message)
      }
    }

  return (
      <div className="w-full h-25 flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 bg-gray shadow-md">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src={assets.logo} alt="Logo" className="w-28 sm:w-32" />
        </div>
      
        {/* Right Section */}
        {userData ? (
          <div className="pr-10 flex items-center space-x-6">
            {/* Apply for Job Button */}
            <button
              className="px-6 py-2 mr-10 text-white font-bold rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 shadow-md hover:scale-105 transition-all"
            >
              
              {userData.role ==="employer" ? "Add a Job" : "Apply for Job"}
            </button>
    
            {/* Notification Icon */}
            <div className="relative group pr-10">
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
    
            {/* Profile Section */}
            <div className="w-10 h-10 flex justify-center items-center rounded-full bg-blue-600 text-white relative group">
              {userData.name[0].toUpperCase()}
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
                <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
                  {!userData.isVerified && (
                    <li onClick={sendverificationOtp} className="py-1 px-2 hover:bg-gray-200 cursor-pointer">Verify email</li>
                  )}
                  <li onClick={logout} className="py-1 px-2 pr-10 hover:bg-gray-200 cursor-pointer">Logout</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
          >
            Login <img src={assets.arrow_icon} alt="Arrow" />
          </button>
        )}
      </div>
    )
    }

export default Navbar