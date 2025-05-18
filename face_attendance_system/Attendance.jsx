import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { toast } from "react-hot-toast";
import config from "../config";
import {
  Box,
  Button,
  Typography,
  Paper,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MarkAttendance = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [hasCamera, setHasCamera] = useState(false);

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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        background: "linear-gradient(to bottom right, #f8fafc, #f5f3ff)",
        pt: "64px",
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: "600px",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}
          >
            Home
          </Link>
          <Typography color="text.primary">Mark Attendance</Typography>
        </Breadcrumbs>

        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700, color: "#4f46e5", mb: 3 }}
        >
          Mark Your Attendance
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
              width={320}
              height={240}
              style={{ borderRadius: "8px", marginBottom: "16px" }}
              videoConstraints={{
                facingMode: "user",
              }}
            />
          ) : (
            <Box
              sx={{
                width: 320,
                height: 240,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f0f0f0",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            >
              <Typography color="error">Camera not detected</Typography>
            </Box>
          )}
          <Button
            variant="contained"
            onClick={captureAndSubmit}
            sx={{
              py: "10px",
              fontWeight: 600,
              fontSize: "0.9375rem",
              bgcolor: "#4f46e5",
              "&:hover": { bgcolor: "#4338ca" },
              width: "100%",
              maxWidth: "320px",
            }}
            disabled={!hasCamera}
          >
            Mark Attendance
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default MarkAttendance;
