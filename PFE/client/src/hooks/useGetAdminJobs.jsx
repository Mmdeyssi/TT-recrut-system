import { AppContent } from "@/context/AppContext";
import { setAllAdminJobs } from "@/redux/JobSlice";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  const { backendUrl } = useContext(AppContent);
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const { data } = await axios.get(backendUrl + "/api/jobs/admin-jobs", {
          withCredentials: true,
        });
        if (data.success) {
          dispatch(setAllAdminJobs(data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAdminJobs();
  }, []);
};

export default useGetAllAdminJobs;
