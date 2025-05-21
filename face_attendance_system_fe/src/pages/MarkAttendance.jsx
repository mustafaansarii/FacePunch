import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { toast } from "react-hot-toast";
import config from "../config";
import { Box, Button, Typography, Paper, useMediaQuery, Breadcrumbs, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MarkAttendance = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [hasCamera, setHasCamera] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    const checkCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setHasCamera(videoDevices.length > 0);
      } catch (err) {
        console.error("Error checking camera:", err);
        setHasCamera(false);
      }
    };
    checkCamera();
  }, []);

  const captureAndSubmit = async () => {
    if (!hasCamera) {
      toast.error("No camera detected");
      return;
    }

    const imageSrc = webcamRef.current.getScreenshot();
    const blob = await (await fetch(imageSrc)).blob();

    const formData = new FormData();
    formData.append("image", blob, "face.jpg");

    try {
      const res = await axios.post(
        `${config.backend_api}/api/features/mark-attendance/`,
        formData
      );
      toast.success(res.data.message);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response?.data ||
        "Attendance marking failed";
      toast.error(errorMessage);
    }
  };

  const webcamWidth = isMobile ? 280 : 320;
  const webcamHeight = isMobile ? 210 : 240;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 64px - 68px)",
        width: "100%",
        padding: 4,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "600px", mb: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/" underline="hover">
            Home
          </Link>
          <Typography color="text.primary">Mark Attendance</Typography>
        </Breadcrumbs>
      </Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 4,
            width: "100%",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "primary.main",
              mb: 3,
              textAlign: "center",
            }}
          >
            Mark Your Attendance
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", mb: 3 }}
          >
            Position your face in the camera and click the button below
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {hasCamera ? (
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={webcamWidth}
                height={webcamHeight}
                style={{
                  borderRadius: "12px",
                  marginBottom: "24px",
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: "background.paper",
                }}
                videoConstraints={{
                  facingMode: "user",
                }}
              />
            ) : (
              <Box
                sx={{
                  width: webcamWidth,
                  height: webcamHeight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "background.default",
                  borderRadius: "12px",
                  marginBottom: "24px",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography color="error">Camera not detected</Typography>
              </Box>
            )}
            <Button
              variant="contained"
              onClick={captureAndSubmit}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                width: "100%",
                maxWidth: "320px",
                background: "linear-gradient(to right, #1976d2, #9c27b0)",
                "&:hover": {
                  background: "linear-gradient(to right, #1565c0, #7b1fa2)",
                },
              }}
              disabled={!hasCamera}
            >
              Mark Attendance
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default MarkAttendance;
