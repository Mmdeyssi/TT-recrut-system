import { AppContent } from "@/context/AppContext";
import { setAllJobs } from "@/redux/JobSlice";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetSearchJobs = () => {
  const { backendUrl, isLoggedIn } = useContext(AppContent);
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  useEffect(() => {
    if (!isLoggedIn || searchedQuery === "") return;
    const fetchAllJobs = async () => {
      try {
        const { data } = await axios.get(
          backendUrl + `/api/jobs/search-job?keyword=${searchedQuery}`,
          { withCredentials: true }
        );
        if (data.success) {
          dispatch(setAllJobs(data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, [searchedQuery]);
};

export default useGetSearchJobs;
