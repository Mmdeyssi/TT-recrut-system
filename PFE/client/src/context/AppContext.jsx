import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();
export const AppContextProvider = (props) => {
  //to stay logged in if when you refresh the page
  axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);
  const [loading, setLoading] = useState(false);
  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth", {
        withCredentials: true,
      });

      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      } else {
        setIsLoggedin(false);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Not logged in - this is expected, so no need to log an error
        setIsLoggedin(false);
      } else {
        console.error("Auth check failed:", err.message);
      }
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      data.succes ? setUserData(data.userData) : toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };
  useEffect(() => {
    getAuthState();
  }, []);
  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    loading,
    setLoading,
  };
  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
