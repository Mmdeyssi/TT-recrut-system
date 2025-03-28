import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import FilterCard from "../components/FilterCard";
import Job from "../components/Job";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setAllJobs, setSearchedQuery } from "@/redux/JobSlice";
import axios from "axios";
import useGetAllJobs from "@/hooks/useGetallJobs";

const Jobs = () => {
  useGetAllJobs();
  const dispatch = useDispatch();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        const title = job?.title || "";
        const desc = job?.description || "";
        const loc = job?.location || "";
        return (
          title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          desc.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          loc.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-40 px-4 sm:px-6 lg:px-8">
        {searchedQuery && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => dispatch(setSearchedQuery(""))}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Clear Search
            </button>
          </div>
        )}
        <div className="flex gap-5">
          {filterJobs.length <= 0 ? (
            <div className="text-center text-xl text-gray-500 mt-10 w-full">
              No jobs found.
            </div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
