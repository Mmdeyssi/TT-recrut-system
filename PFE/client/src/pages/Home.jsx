import { AppContent } from "@/context/AppContext";
import React, { useContext } from "react";
import UserDashboard from "./UserHome";
import LandingPage from "./PublicHome";
const Home = () => {
  const { isLoggedIn } = useContext(AppContent);
  return isLoggedIn ? <UserDashboard /> : <LandingPage />;
};

export default Home;
