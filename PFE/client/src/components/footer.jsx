import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-semibold">TT Recrut System</h2>
          <p className="text-gray-400 mt-3">
            Connecting top talent with leading companies through AI-driven recruitment.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-medium mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition">Find a Job</a></li>
            <li><a href="#" className="hover:text-white transition">Hire Talent</a></li>
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-medium mb-4">Contact Us</h3>
          <p className="text-gray-400">Email: support@ttrecrut.com</p>
          <p className="text-gray-400 mt-1">Phone: +1 234 567 890</p>
          <p className="text-gray-400 mt-1">Location: Paris, France</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-medium mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition text-2xl"><FaFacebookF /></a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition text-2xl"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition text-2xl"><FaLinkedinIn /></a>
            <a href="#" className="text-gray-400 hover:text-pink-500 transition text-2xl"><FaInstagram /></a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} TT Recrut System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
