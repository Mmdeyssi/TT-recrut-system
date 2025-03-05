import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { assets } from '../assets/assets';
import ServiceCards from "../components/Services";
import Footer from "../components/footer";
import { AppContent } from "../context/AppContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoggedIn } = useContext(AppContent);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight / 2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-stone-100 text-gray-800 flex flex-col">
       {/* Navbar */}
       <Navbar />
      {/* Hero Section */}
      <motion.div 
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="relative w-full h-screen flex items-center"
>
  <img 
    src={assets.home4} 
    className="absolute top-0 left-0 w-full h-full object-cover" 
    alt="" 
  />
  
  {/* Text Container */}
  <div className="relative z-10 max-w-2xl text-left ml-10 text-white">
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-6xl font-bold text-[#272343]"
    >
      The Future of <span className="italic font-semibold">Recruitment</span> Starts Here
    </motion.h1>
    
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 1 }}
      className="mt-6 mb-10 text-lg font-light text-[#2d334a]"
    >
      TT Recrut System connects top talent with leading companies<br/>
       using advanced AI-powered matching technology. 
      Find the <br /> perfect job or the ideal candidate effortlessly.
    </motion.p>
    
    {!isLoggedIn && (
      <motion.div 
        className="mt-5 flex space-x-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <motion.button 
          onClick={() => navigate('/login')} 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md 
              hover:bg-blue-700 transition"
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.5)" }}
          whileTap={{ scale: 0.95 }}
        >
          Find a Job
        </motion.button>

        <motion.button 
          onClick={() => navigate('/login')} 
          className="ml-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-md 
              hover:bg-gray-900 transition"
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.5)" }}
          whileTap={{ scale: 0.95 }}
        >
          Hire Talent
        </motion.button>
      </motion.div>
    )}
  </div>
</motion.div>

  {/* Text Content */}

      {/* New Section */}
      <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-gray-800 py-20 px-20 flex flex-wrap items-center justify-between"
      >
      <div className="w-full md:w-1/2">
        <h2 className="text-6xl md:text-7xl font-light leading-tight">
        Recruitment is evolving.
        <br /> <span className="italic font-semibold">Are you ready?</span>
        </h2>
      </div>
      <div className="w-full md:w-1/2 mt-6 md:mt-0">
      <p className="text-lg font-light text-gray-700">
      Our understanding of what leads to effective hiring is constantly updating. So, shouldn’t recruitment be changing too?
      </p>
      <p className="mt-4 text-lg font-light text-gray-700">
      Traditional recruitment systems rely on outdated methods, leading to inefficiencies and missed opportunities. TT Recrut System leverages AI to streamline hiring, ensuring a perfect fit between candidates and employers.
      </p>
      </div>
      </motion.div>
      
        <img src={assets.home9} className="w-full h-150 mt-10 mb-10 mr-8 mr-8  block  shadow-md"/>
     
      
  
      

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto text-center mt-4"
      >
      <div className="px-1 w-fit mx-auto py-3 my-10 bg-white text-gray-700 text-2xl font-semibold rounded-lg shadow-md " 
     style={{ boxShadow: "0 0 24px #f7d252" }}>
      services
      </div>


        <h2 className="text-5xl font-light mt-4">
          AI-Powered <span className="italic font-semibold">Recruitment</span>
        </h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          We leverage cutting-edge AI technology to simplify hiring and job searching.
          Our platform connects top talent with leading employers, ensuring seamless recruitment.
        </p>

        <ServiceCards/>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto text-center mt-20"
      >
       <div className="px-1 w-fit mx-auto py-3 my-10 bg-white text-gray-700 text-2xl font-semibold rounded-lg shadow-md " 
     style={{ boxShadow: "0 0 24px #f7d252" }}>
       why choose us ?
      </div>
        <h2 className="text-5xl font-light mt-4">
          The <span className="italic font-semibold">Future</span> of Hiring
        </h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Our platform simplifies and accelerates recruitment with AI-powered automation, secure hiring,
          and powerful insights.
        </p>

        {/* Features List */}
        <div className="mt-10 mb-10 grid md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2">✅ AI-Powered Matching</h3>
            <p className="text-gray-600">
              Find the perfect candidate instantly using machine learning.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2">✅ User-Friendly Interface</h3>
            <p className="text-gray-600">
              Effortless job search and hiring with a seamless experience.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2">✅ Time-Saving Automation</h3>
            <p className="text-gray-600">
              Reduce manual hiring tasks and speed up recruitment.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2">✅ Secure & Reliable</h3>
            <p className="text-gray-600">
              Data protection and safe communication for employers & candidates.
            </p>
          </motion.div>
        </div>
      </motion.div>
      

      <Footer/>
    </div>
  );
};

export default LandingPage;
