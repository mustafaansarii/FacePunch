import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCamera, FaClipboardList, FaChartLine } from "react-icons/fa";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import { Card } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Candidate Registration",
      description: "Register new candidates with facial recognition",
      path: "/register",
      icon: <FaUser className="w-16 h-16" />,
      color: "from-blue-500/20 to-indigo-600/20",
      hoverColor: "from-blue-500/30 to-indigo-600/30",
    },
    {
      title: "Mark Attendance",
      description: "Quickly mark attendance using face detection",
      path: "/attendance",
      icon: <FaCamera className="w-16 h-16" />,
      color: "from-violet-500/20 to-purple-600/20",
      hoverColor: "from-violet-500/30 to-purple-600/30",
    },
    {
      title: "Registered Users",
      description: "View and manage all registered candidates",
      path: "/all-registered-users",
      icon: <FaClipboardList className="w-16 h-16" />,
      color: "from-fuchsia-500/20 to-pink-600/20",
      hoverColor: "from-fuchsia-500/30 to-pink-600/30",
    },
    {
      title: "Attendance Records",
      description: "Track and analyze attendance history",
      path: "/attendance-records",
      icon: <FaChartLine className="w-16 h-16" />,
      color: "from-rose-500/20 to-red-600/20",
      hoverColor: "from-rose-500/30 to-red-600/30",
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
    <Layout>
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center pt-10 md:pt-16">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#ec4899] to-[#f472b6]">
            Face Attendance System
          </h1>
          <p className="text-xl text-black/70 dark:text-white/70 mb-12 max-w-[800px] mx-auto">
            Revolutionize your attendance tracking with AI-powered facial
            recognition technology
          </p>
        </motion.div>

        <motion.div
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className={`group flex flex-col items-center justify-between p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 min-h-[320px] border border-black/10 dark:border-white/10 relative overflow-hidden bg-gradient-to-br ${feature.color} hover:bg-gradient-to-br ${feature.hoverColor} backdrop-blur-sm`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#ec4899]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex flex-col items-center w-full z-10">
                <span className="text-6xl mb-8 text-black dark:text-white select-none group-hover:text-[#ec4899] transition-colors duration-300">
                  {feature.icon}
                </span>
                <h2 className="text-2xl font-bold text-black dark:text-white mb-4 tracking-wide group-hover:text-[#ec4899] transition-colors duration-300">
                  {feature.title}
                </h2>
                <p className="text-black/80 dark:text-white/80 mb-8 min-h-[48px] flex items-center justify-center text-center text-base font-medium group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
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
    </Layout>
  );
};

export default Home;
