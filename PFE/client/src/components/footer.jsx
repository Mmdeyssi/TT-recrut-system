import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-100 w-full absolute bottom-0 left-0 py-6 px-6 sm:px-24 shadow-inner">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center flex-wrap">
        {/* Left Section: Logo and Description */}
        <div className="flex items-center space-x-4">
          
          <p className="text-gray-700 text-sm">
           TT Recruit System – The future of recruitment is here
          </p>
          
        </div>
        <img src={assets.logo} alt="TT Logo" className="w-15 align-center" />

        {/* Right Section: Links and Contact */}
        <div className="flex items-center space-x-8">
          <ul className="flex space-x-6 text-gray-700 text-sm">
            <li>
              <a href="/about" className="hover:text-blue-600">About Us</a>
            </li>
        
            <li>
              <a href="/contact" className="hover:text-blue-600">Contact</a>
            </li>
          </ul>
          <p className="text-gray-600 text-sm">
            TT Recrut System © {new Date().getFullYear()} 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
