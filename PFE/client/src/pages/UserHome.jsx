import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/footer";
import HeroSection from "@/components/HeroSection";
import CategoryCarousel from "@/components/CategoryCarousel";
import LatestJobs from "@/components/LatestJobs";

const UserDashboard = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <LatestJobs />
    </div>
  );
};

export default UserDashboard;
