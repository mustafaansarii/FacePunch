import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { toast } from "react-hot-toast";
import config from "../config";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Register = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "",
    dob: "",
  });
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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const captureAndSubmit = async () => {
    if (!hasCamera) {
      toast.error("No camera detected");
      return;
    }

    const imageSrc = webcamRef.current.getScreenshot();
    const blob = await (await fetch(imageSrc)).blob();

    const formData = new FormData();
    formData.append("image", blob, "face.jpg");
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("gender", form.gender);
    formData.append("dob", form.dob);

    try {
      const accessToken = localStorage.getItem("access_token");
      const res = await axios.post(
        `${config.backend_api}/api/features/register/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success(res.data.message);
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response?.data ||
        "Registration failed";
      toast.error(errorMessage);
    }
  };

  return (
    <Layout>
      <Box className="flex justify-center w-full items-center">
        <Paper
          elevation={4}
          className="p-8 w-full max-w-3xl rounded-xl backdrop-blur-sm"
        >
          <Breadcrumbs aria-label="breadcrumb" className="mb-6">
            <Link
              underline="hover"
              color="inherit"
              onClick={() => navigate("/")}
              className="cursor-pointer"
            >
              Home
            </Link>
            <Typography color="text.primary">Registration</Typography>
          </Breadcrumbs>

          <Typography
            variant="h4"
            component="h1"
            className="mb-8 font-bold text-center text-primary"
          >
            Face Registration
          </Typography>

          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                margin="normal"
                className="mb-4"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                margin="normal"
                className="mb-4"
              />
              <FormControl fullWidth margin="normal" className="mb-4">
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={form.gender}
                  label="Gender"
                  onChange={handleChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dob"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={form.dob}
                onChange={handleChange}
                margin="normal"
                className="mb-4"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="flex flex-col items-center">
                {hasCamera ? (
                  <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={320}
                    height={240}
                    className="rounded-lg mb-6"
                    videoConstraints={{
                      facingMode: "user",
                    }}
                  />
                ) : (
                  <Box className="w-80 h-60 flex items-center justify-center rounded-lg mb-6">
                    <Typography color="error">Camera not detected</Typography>
                  </Box>
                )}
                <Button
                  variant="contained"
                  onClick={captureAndSubmit}
                  className="py-3 rounded-lg font-semibold w-full max-w-xs"
                  disabled={!hasCamera}
                >
                  Register Face
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Layout>
  );
};

export default Register;
