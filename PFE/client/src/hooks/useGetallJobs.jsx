import { setAllJobs } from "@/redux/JobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// hooks/useGetallJobs.js
const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job); // ADD THIS
  useEffect(() => {
    const fetchJobs = async () => {
      const url = searchedQuery
        ? `http://localhost:4000/api/jobs/search-job?keyword=${searchedQuery}`
        : "http://localhost:4000/api/jobs/all-jobs";
      try {
        const { data } = await axios.get(url);
        if (data.success) {
          dispatch(setAllJobs(data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, [searchedQuery]); // DEPENDENCY
};

export default useGetAllJobs;
