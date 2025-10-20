import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-3 tracking-wide">
            Pagaar<span className="text-blue-400"> India</span>
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Empowering careers across India — find your dream job, connect with
            top employers, and take the next step in your professional journey.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 relative after:content-[''] after:block after:w-10 after:h-[2px] after:bg-blue-500 after:mt-1">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><NavLink to="/" className="hover:text-blue-400 transition-colors">Home</NavLink></li>
            <li><NavLink to="/jobs" className="hover:text-blue-400 transition-colors">Jobs</NavLink></li>
            <li><NavLink to="/companies" className="hover:text-blue-400 transition-colors">Companies</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-blue-400 transition-colors">Contact</NavLink></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 relative after:content-[''] after:block after:w-10 after:h-[2px] after:bg-blue-500 after:mt-1">
            Resources
          </h3>
          <ul className="space-y-2 text-sm">
            <li><NavLink to="/career-tips" className="hover:text-blue-400 transition-colors">Career Tips</NavLink></li>
            <li><NavLink to="/faq" className="hover:text-blue-400 transition-colors">FAQs</NavLink></li>
            <li><NavLink to="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</NavLink></li>
            <li><NavLink to="/terms" className="hover:text-blue-400 transition-colors">Terms & Conditions</NavLink></li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 relative after:content-[''] after:block after:w-10 after:h-[2px] after:bg-blue-500 after:mt-1">
            Contact Us
          </h3>
          <p className="text-sm">📧 support@pagaarindia.com</p>
          <p className="text-sm mb-3">📞 +91 98765 43210</p>

          <div className="flex space-x-4 mt-4">
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-500 hover:scale-110 transition-all duration-300">
              <FaFacebookF className="text-white text-sm" />
            </a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-500 hover:scale-110 transition-all duration-300">
              <FaTwitter className="text-white text-sm" />
            </a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-500 hover:scale-110 transition-all duration-300">
              <FaLinkedinIn className="text-white text-sm" />
            </a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-500 hover:scale-110 transition-all duration-300">
              <FaInstagram className="text-white text-sm" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 mt-10 text-center pt-4 text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()} <span className="text-white font-semibold">Pagaar India</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
