import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCamera, FaClipboardList, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { Box } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  const { themeMode } = useTheme();

  const features = [
    {
      title: "Candidate Registration",
      description: "Register new candidates with facial recognition",
      path: "/register",
      icon: <FaUser className="w-16 h-16" />,
      color: themeMode === 'dark' ? "from-blue-500/20 to-indigo-600/20" : "from-blue-100 to-indigo-100",
      hoverColor: themeMode === 'dark' ? "from-blue-500/30 to-indigo-600/30" : "from-blue-200 to-indigo-200",
    },
    {
      title: "Mark Attendance",
      description: "Quickly mark attendance using face detection",
      path: "/attendance",
      icon: <FaCamera className="w-16 h-16" />,
      color: themeMode === 'dark' ? "from-violet-500/20 to-purple-600/20" : "from-violet-100 to-purple-100",
      hoverColor: themeMode === 'dark' ? "from-violet-500/30 to-purple-600/30" : "from-violet-200 to-purple-200",
    },
    {
      title: "Registered Users",
      description: "View and manage all registered candidates",
      path: "/all-registered-users",
      icon: <FaClipboardList className="w-16 h-16" />,
      color: themeMode === 'dark' ? "from-fuchsia-500/20 to-pink-600/20" : "from-fuchsia-100 to-pink-100",
      hoverColor: themeMode === 'dark' ? "from-fuchsia-500/30 to-pink-600/30" : "from-fuchsia-200 to-pink-200",
    },
    {
      title: "Attendance Records",
      description: "Track and analyze attendance history",
      path: "/attendance-records",
      icon: <FaChartLine className="w-16 h-16" />,
      color: themeMode === 'dark' ? "from-rose-500/20 to-red-600/20" : "from-rose-100 to-red-100",
      hoverColor: themeMode === 'dark' ? "from-rose-500/30 to-red-600/30" : "from-rose-200 to-red-200",
    },
  ];

  const handleFeatureClick = (path) => {
    const accessToken = localStorage.getItem("access_token");
    if (path === "/register" && !accessToken) {
      navigate("/signin");
    } else {
      navigate(path);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center pt-10 md:pt-16 px-4">
      <motion.div
        className="mb-16 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#ec4899] to-[#f472b6]">
          Face Attendance System
        </h1>
        <p className={`text-xl ${themeMode === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-12 max-w-[800px] mx-auto px-4`}>
          Revolutionize your attendance tracking with AI-powered facial recognition technology
        </p>
      </motion.div>

      <motion.div
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 px-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={item}
            className={`group flex flex-col items-center justify-between p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 min-h-[320px] border ${
              themeMode === 'dark' ? 'border-white/10' : 'border-gray-200'
            } relative overflow-hidden  ${feature.color} hover:${feature.hoverColor} backdrop-blur-sm`}
          >
            <div className="absolute inset-0 from-[#ec4899]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex flex-col items-center w-full z-10">
              <span className={`text-6xl mb-8 ${
                themeMode === 'dark' ? 'text-white' : 'text-gray-800'
              } select-none group-hover:text-[#ec4899] transition-colors duration-300`}>
                {feature.icon}
              </span>
              <h2 className={`text-2xl font-bold ${
                themeMode === 'dark' ? 'text-white' : 'text-gray-800'
              } mb-4 tracking-wide group-hover:text-[#ec4899] transition-colors duration-300`}>
                {feature.title}
              </h2>
              <p className={`${
                themeMode === 'dark' ? 'text-gray-300' : 'text-gray-600'
              } mb-8 min-h-[48px] flex items-center justify-center text-center text-base font-medium group-hover:${
                themeMode === 'dark' ? 'text-white' : 'text-gray-800'
              } transition-colors duration-300`}>
                {feature.description}
              </p>
            </div>
            <button
              onClick={() => handleFeatureClick(feature.path)}
              className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] hover:from-[#2563eb] hover:to-[#3b82f6] transition-all duration-200 shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] active:scale-95 relative overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
