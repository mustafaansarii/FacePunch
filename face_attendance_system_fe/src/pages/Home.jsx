import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCamera, FaClipboardList, FaChartLine } from "react-icons/fa";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Candidate Registration",
      description: "Register new candidates with facial recognition",
      path: "/register",
      icon: <FaUser className="w-16 h-16" />,
    },
    {
      title: "Mark Attendance",
      description: "Quickly mark attendance using face detection",
      path: "/attendance",
      icon: <FaCamera className="w-16 h-16" />,
    },
    {
      title: "Registered Users",
      description: "View and manage all registered candidates",
      path: "/all-registered-users",
      icon: <FaClipboardList className="w-16 h-16" />,
    },
    {
      title: "Attendance Records",
      description: "Track and analyze attendance history",
      path: "/attendance-records",
      icon: <FaChartLine className="w-16 h-16" />,
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

  return (
    <div className="min-h-screen w-full pb-16 flex flex-col items-center">
      <Navbar />
      <div className="w-full max-w-[1200px] flex flex-col items-center pt-20 px-4 text-center">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-[#ec4899] to-[#f472b6]">
            Face Attendance System
          </h1>
          <p className="text-xl text-white/70 mb-12 max-w-[800px] mx-auto animate-fade-in delay-100">
            Revolutionize your attendance tracking with AI-powered facial
            recognition technology
          </p>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex flex-col items-center justify-between p-8 bg-gradient-to-br from-[#1e1b4b] to-[#2c1a4d] rounded-3xl shadow-2xl hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] transition-all duration-500 hover:-translate-y-3 hover:scale-105 min-h-[320px] animate-fade-in-up border border-white/10 relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex flex-col items-center w-full z-10">
                <span className="text-6xl mb-8 text-white select-none group-hover:text-[#ec4899] transition-colors duration-300">
                  {feature.icon}
                </span>
                <h2 className="text-2xl font-bold text-white mb-4 tracking-wide group-hover:text-[#ec4899] transition-colors duration-300">
                  {feature.title}
                </h2>
                <p className="text-white/80 mb-8 min-h-[48px] flex items-center justify-center text-center text-base font-medium group-hover:text-white transition-colors duration-300">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
