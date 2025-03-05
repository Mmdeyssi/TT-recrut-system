import React from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="h-[70vh] flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-400 text-white"
      >
        <h1 className="text-6xl font-light">
          About <span className="italic font-semibold">TT Recrut System</span>
        </h1>
        <p className="mt-6 text-lg max-w-3xl font-light">
          Empowering companies and job seekers with AI-driven recruitment solutions for a seamless hiring experience.
        </p>
      </motion.section>

      {/* Our Mission */}
      <section className="py-16 px-10 max-w-7xl mx-auto text-center">
        <motion.h2 
          className="text-5xl font-light leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Our <span className="italic font-semibold">Mission</span>
        </motion.h2>
        <p className="text-lg text-gray-700 mt-6">
          At TT Recrut System, our mission is to revolutionize hiring by leveraging AI technology to create **smart job matches** between candidates and employers.
        </p>
      </section>

      {/* How It Works */}
      <section className="py-16 px-10 max-w-7xl mx-auto">
        <motion.h2 
          className="text-5xl font-light text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          How It <span className="italic font-semibold">Works</span>
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Step 1 */}
          <motion.div 
            className="bg-white p-6 shadow-lg rounded-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold">1. AI-Powered Job Matching</h3>
            <p className="text-gray-700 mt-2">
              Our system analyzes skills, experience, and job requirements to recommend the best matches.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            className="bg-white p-6 shadow-lg rounded-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold">2. Smart Filtering & Insights</h3>
            <p className="text-gray-700 mt-2">
              Companies can filter candidates based on AI-driven ranking scores and smart analytics.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            className="bg-white p-6 shadow-lg rounded-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold">3. Seamless Hiring Process</h3>
            <p className="text-gray-700 mt-2">
              From application tracking to scheduling interviews, our platform streamlines recruitment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 px-10 max-w-7xl mx-auto text-center">
        <motion.h2 
          className="text-5xl font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Meet Our <span className="italic font-semibold">Team</span>
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Team Member 1 */}
          <motion.div 
            className="bg-white p-6 shadow-lg rounded-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <img src={assets.team1} alt="Team Member" className="w-24 h-24 mx-auto rounded-full" />
            <h3 className="text-xl font-semibold mt-4">John Doe</h3>
            <p className="text-gray-600">CEO & Founder</p>
          </motion.div>

          {/* Team Member 2 */}
          <motion.div 
            className="bg-white p-6 shadow-lg rounded-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <img src={assets.team2} alt="Team Member" className="w-24 h-24 mx-auto rounded-full" />
            <h3 className="text-xl font-semibold mt-4">Sarah Smith</h3>
            <p className="text-gray-600">Head of AI Development</p>
          </motion.div>

          {/* Team Member 3 */}
          <motion.div 
            className="bg-white p-6 shadow-lg rounded-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <img src={assets.team3}alt="Team Member" className="w-24 h-24 mx-auto rounded-full" />
            <h3 className="text-xl font-semibold mt-4">Michael Lee</h3>
            <p className="text-gray-600">HR Leader</p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center py-16 bg-blue-600 text-white"
      >
        <h2 className="text-4xl font-semibold">Join TT Recrut System Today</h2>
        <p className="text-lg text-white mt-4">
          Discover AI-powered recruitment and take hiring to the next level.
        </p>
        <button onClick={() => navigate('/')} className="mt-6 px-8 py-4 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition">
          Get Started
        </button>
      </motion.section>
    </div>
  );
};

export default AboutUs;
