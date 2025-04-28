import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import ServiceCards from "../components/Services";
import Footer from "../components/footer";
import { AppContent } from "../context/AppContext";
import useGetAllJobs from "@/hooks/useGetallJobs";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import useGetSearchJobs from "@/hooks/useGetSearchJobs";
import { setSearchedQuery } from "@/redux/JobSlice";

const LandingPage = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);

  useGetSearchJobs();
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/jobs");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchJobHandler();
    }
  };

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
        className="relative w-full min-h-[90vh] flex flex-col  px-4 sm:px-10 lg:flex-row items-center"
      >
        <img
          src={assets.home4}
          className="absolute top-0 left-0 w-full h-full object-cover"
          alt=""
        />

        {/* Text Container */}
        <div className="relative z-10 max-w-2xl text-left text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F2937]" // Updated color
          >
            Your Dream Job Is Just One Match Away
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mt-6 mb-8 text-base sm:text-lg text-[#2d334a]"
          >
            AI-powered precision. Human-first experience. <br />
            Discover tailored job opportunities that truly fit.
          </motion.p>

          <div className="mt-6 w-full max-w-2xl mx-auto bg-white shadow-lg rounded-full flex items-center px-4 py-2">
            <Search className="text-gray-400 w-5 h-5 mr-3" />
            <input
              type="text"
              placeholder="Search for jobs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow text-gray-700 bg-transparent outline-none placeholder-gray-400 text-sm sm:text-base"
            />
            <button
              onClick={searchJobHandler}
              className="bg-green-400 text-white font-semibold px-6 py-2 rounded-full shadow transition-all"
            >
              Search
            </button>
          </div>
        </div>
      </motion.div>

      {/* Text Content */}

      {/* Services Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8 mt-4"
      >
        <div
          className="px-4 w-fit mx-auto py-2 sm:py-3 my-8 sm:my-10 bg-white text-gray-700 text-xl sm:text-2xl font-semibold rounded-lg shadow-md"
          style={{ boxShadow: "0 0 24px #f7d252" }}
        >
          Services
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mt-4">
          AI-Powered <span className="italic font-semibold">Recruitment</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-gray-700 max-w-3xl mx-auto px-2">
          We leverage cutting-edge AI technology to simplify hiring and job
          searching. Our platform connects top talent with leading employers,
          ensuring seamless recruitment.
        </p>

        <ServiceCards />
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto text-center mt-16 px-4 sm:px-6 lg:px-8"
      >
        <div
          className="px-4 w-fit mx-auto py-2 sm:py-3 my-8 sm:my-10 bg-white text-gray-700 text-xl sm:text-2xl font-semibold rounded-lg shadow-md"
          style={{ boxShadow: "0 0 24px #f7d252" }}
        >
          Why choose us?
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mt-4">
          The <span className="italic font-semibold">Future</span> of Hiring
        </h2>
        <p className="mt-4 text-base sm:text-lg text-gray-700 max-w-3xl mx-auto px-2">
          Our platform simplifies and accelerates recruitment with AI-powered
          automation, secure hiring, and powerful insights.
        </p>

        {/* Features List */}
        <div className="mt-10 mb-10 grid sm:grid-cols-2 gap-6 md:gap-8 px-2">
          {[
            {
              title: "✅ AI-Powered Matching",
              desc: "Find the perfect candidate instantly using machine learning.",
            },
            {
              title: "✅ User-Friendly Interface",
              desc: "Effortless job search and hiring with a seamless experience.",
            },
            {
              title: "✅ Time-Saving Automation",
              desc: "Reduce manual hiring tasks and speed up recruitment.",
            },
            {
              title: "✅ Secure & Reliable",
              desc: "Data protection and safe communication for employers & candidates.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-5 sm:p-6 rounded-lg shadow-lg text-left"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default LandingPage;
