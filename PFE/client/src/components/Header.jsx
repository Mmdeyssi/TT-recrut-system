import React, { useContext } from 'react'
import { motion } from 'framer-motion';
import { AppContent } from '../context/AppContext';
import { assets } from '../assets/assets';
export default function Header() {
  const {userData} = useContext(AppContent)
 
  return (
    
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-blue-600">Welcome to TT Recrut System</h1>
        <p className="text-gray-700 mt-4 text-lg">
          Empowering <span className="font-semibold">Tunisie Telecom</span> with smart hiring solutions.
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-8 max-w-3xl"
      >
        <div className="shadow-lg bg-white p-6 rounded-2xl text-center space-y-4">
          <div className='flex items-center justify-center space-x-2'>
            <h2 className="text-2xl font-semibold text-blue-500">Hello {userData? userData.name : 'dd'}, and welcome back!</h2>
            <img src={assets.hand_wave} className='w-6 h-6 inline' alt="" />
          </div>
        
          <p className="text-gray-600">✅ Post and Manage Job Openings</p>
          <p className="text-gray-600">📂 Upload and Track Candidate Applications</p>
          <p className="text-gray-600">🤖 AI-Powered Candidate Matching</p>
          <p className="text-gray-600 font-medium">Join us in shaping the future of telecommunications!</p>
          
         
        </div>
      </motion.div>
    </div>
  );
}

