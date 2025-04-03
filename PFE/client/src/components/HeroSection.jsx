import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/JobSlice";
import CategoryCarousel from "./CategoryCarousel";
import { assets } from "@/assets/assets";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (!query.trim()) return;
    dispatch(setSearchedQuery(query));
    navigate("/jobs");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchJobHandler();
    }
  };

  return (
    <motion.div
      className="relative w-full min-h-[80vh] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#dbeafe] via-[#e0e7ff] to-[#f5f3ff] z-0" />

      {/* Content */}
      <div className="relative z-10 text-center mt-28 sm:mt-36 w-full max-w-4xl px-4 sm:px-6">
        {/* Tagline */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto px-4 py-2 rounded-full bg-white text-[#F83002] font-medium w-fit text-sm shadow-md"
        >
          No. 1 Job Hunt Website
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mt-6 leading-snug text-gray-800"
        >
          Search, Apply & <br />
          Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-700 mx-auto mt-4 text-base sm:text-lg px-2 max-w-2xl"
        >
          Explore top opportunities from the best companies around the world.
          Your dream role is just a few clicks away.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 w-full max-w-2xl mx-auto"
        >
          <div className="mt-8 w-full bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition rounded-2xl flex flex-col sm:flex-row items-center px-4 py-3 sm:py-3 gap-3 sm:gap-0">
            <div className="flex items-center w-full sm:w-auto flex-grow">
              <Search className="text-gray-400 w-5 h-5 mr-3" />
              <input
                type="text"
                placeholder="Find your dream Job…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Search for jobs"
                className="w-full text-gray-700 bg-transparent outline-none placeholder-gray-500 text-sm sm:text-base"
              />
            </div>
            <button
              onClick={searchJobHandler}
              aria-label="Submit job search"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold px-6 py-2 rounded-full transition-all duration-200"
            >
              Search
            </button>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10 max-w-6xl mx-auto px-2 sm:px-6"
        >
          <CategoryCarousel />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
