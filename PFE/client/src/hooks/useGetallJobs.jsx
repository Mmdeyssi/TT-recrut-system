import { setAllJobs } from "@/redux/JobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/jobs/all-jobs"
        );
        if (data.success) {
          dispatch(setAllJobs(data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;
