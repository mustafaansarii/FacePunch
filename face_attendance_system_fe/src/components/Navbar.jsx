import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  ChevronLeft,
  Camera as CameraIcon,
} from "@mui/icons-material";
import {
  Button,
  Typography,
  IconButton,
  Box,
} from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = localStorage.getItem("access_token");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.reload();
  };

  return (
    <Box
      component="nav"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bgcolor: isScrolled
          ? "rgba(255, 255, 255, 0.8)"
          : "rgba(255, 255, 255, 0.9)",
        backdropFilter: isScrolled ? "blur(8px)" : "none",
        transition: "all 0.3s ease",
        zIndex: 1100,
        borderBottom: "1px solid #e2e8f0",
        px: 3,
        py: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1280px",
          mx: "auto",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CameraIcon sx={{ color: "#4f46e5" }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#4f46e5" }}>
            FacePunch
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          {accessToken ? (
            <>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="small"
                sx={{ bgcolor: "#4f46e5", "&:hover": { bgcolor: "#4338ca" } }}
              >
                Register
              </Button>
              <Button
                component={Link}
                to="/attendance"
                variant="contained"
                size="small"
                sx={{ bgcolor: "#4f46e5", "&:hover": { bgcolor: "#4338ca" } }}
              >
                Mark Attendance
              </Button>
              <Button
                onClick={handleSignOut}
                color="error"
                variant="outlined"
                size="small"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              to="/signin"
              variant="outlined"
              size="small"
              sx={{ color: "#4f46e5", borderColor: "#4f46e5" }}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
