import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import Header from '../components/Header';


const AdminDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <Header/>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
