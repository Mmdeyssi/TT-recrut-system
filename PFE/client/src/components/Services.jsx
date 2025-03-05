import React from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

const services = [
  {
    id: 1,
    title: "Seamless Hiring with AI-Powered Matchmaking",
    description:
      "Our AI-driven recruitment system ensures that businesses connect with the right candidates effortlessly.",
     // Replace with actual image path
  },
  {
    id: 2,
    title: "AI-Powered Resume Analysis",
    description:
      "Say goodbye to manual resume screening! TT Recrut System leverages AI to scan and rank resumes.",
     // Replace with actual image path
  },
  {
    id: 3,
    title: "Enhancing Recruitment with Smart Automation",
    description:
      "Streamline hiring by automating candidate screening, interview scheduling, and feedback collection.",
     // Replace with actual image path
  },
];

const ServiceCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 py-16">
      {services.map((service) => (
        <motion.div
          key={service.id}
          className="relative w-full h-[400px] rounded-lg overflow-hidden group"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={assets[`home${service.id}`]}
            alt={service.title}
            className="w-full h-full object-cover group-hover:brightness-50 transition-all duration-500"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <h3 className="text-2xl font-bold text-center">{service.title}</h3>
            <p className="text-sm text-center max-w-xs mt-2">{service.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceCards;
