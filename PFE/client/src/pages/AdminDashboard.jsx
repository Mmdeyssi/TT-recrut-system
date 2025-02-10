import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';


const AdminDashboard = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
          <Navbar />
          
          <div className="flex flex-col items-center text-center mt-20 px-6">
            <h1 className="text-4xl font-bold text-blue-700">Welcome to the Admin Dashboard</h1>
            <p className="text-lg text-gray-700 mt-4 max-w-2xl">
              Manage job postings, review applications, and oversee the hiring process efficiently.
            </p>
          </div>
    
          <div className="mt-10 flex justify-center gap-10">
            {/* Manage Jobs Section */}
            <div className="bg-white shadow-lg rounded-xl p-6 w-80 text-center hover:shadow-2xl transition duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Manage Jobs</h3>
              <p className="text-gray-600 text-sm mb-4">Create, edit, and manage job postings with ease.</p>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-all">
                Add a Job
              </button>
            </div>
            
            {/* View Applications Section */}
            <div className="bg-white shadow-lg rounded-xl p-6 w-80 text-center hover:shadow-2xl transition duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">View Applications</h3>
              <p className="text-gray-600 text-sm mb-4">Review applications and track applicant progress.</p>
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-all">
                View Applicants
              </button>
            </div>
          </div>
          
          <div className="flex-grow"></div>
          <Footer />
        </div>
      );
    };

export default AdminDashboard;
