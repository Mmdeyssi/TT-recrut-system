import { AppContent } from "@/context/AppContext";
import { setAllAppliedJobs } from "@/redux/JobSlice";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  const { backendUrl } = useContext(AppContent);
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/application/applied-jobs`,
          {
            withCredentials: true,
          }
        );
        if (data.success) {
          console.log(data);
          dispatch(setAllAppliedJobs(data.application));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAppliedJobs();
  }, []);
};
export default useGetAppliedJobs;
