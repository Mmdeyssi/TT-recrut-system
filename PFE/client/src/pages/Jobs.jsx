import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import FilterCard from "../components/FilterCard";
import Job from "../components/Job";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setFilterQuery, setSearchedQuery } from "@/redux/JobSlice";
import useGetAllJobs from "@/hooks/useGetallJobs";

const Jobs = () => {
  useGetAllJobs();
  const dispatch = useDispatch();
  const { allJobs, searchedQuery, filterQuery } = useSelector(
    (store) => store.job
  );

  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  useEffect(() => {
    let jobs = [...allJobs];

    // 1. Filter by searchQuery from Hero
    if (searchedQuery && typeof searchedQuery === "string") {
      const lowerQuery = searchedQuery.toLowerCase();
      jobs = jobs.filter((job) =>
        [job.title, job.description, job.location].some((field) =>
          field?.toLowerCase().includes(lowerQuery)
        )
      );
    }

    // 2. Filter by checkboxes (filterQuery)
    if (Array.isArray(filterQuery) && filterQuery.length > 0) {
      jobs = jobs.filter((job) => {
        const matches = filterQuery.every((filter) =>
          [job.title, job.location, job.jobType, String(job.salary)]
            .map((x) => x?.toLowerCase())
            .includes(filter.toLowerCase())
        );
        return matches;
      });
    }

    setFilteredJobs(jobs);
  }, [allJobs, searchedQuery, filterQuery]);

  const clearFilters = () => {
    dispatch(setSearchedQuery(""));
    dispatch(setFilterQuery([]));
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-40 px-4 sm:px-6 lg:px-8">
        {(searchedQuery || filterQuery.length > 0) && (
          <div className="flex justify-end mb-4">
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Clear Search
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-1/4">
            <FilterCard />
          </div>

          <div className="w-full lg:w-3/4 h-[88vh] overflow-y-auto pb-5">
            {filteredJobs.length === 0 ? (
              <div className="text-center text-xl text-gray-500 mt-10">
                No jobs found.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
