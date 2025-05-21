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
import { motion } from "framer-motion";

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
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: '800px' }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 4,
              width: '100%',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{ 
                fontWeight: 700, 
                color: 'primary.main', 
                mb: 3,
                textAlign: 'center'
              }}
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
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
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
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {hasCamera ? (
                    <Webcam
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width={320}
                      height={240}
                      sx={{ 
                        borderRadius: '12px', 
                        mb: 3,
                        border: '1px solid',
                        borderColor: 'divider'
                      }}
                      videoConstraints={{
                        facingMode: "user",
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 320,
                        height: 240,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '12px',
                        mb: 3,
                        border: '1px solid',
                        borderColor: 'divider'
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
                      width: '100%',
                      maxWidth: '320px',
                      background: 'linear-gradient(to right, #1976d2, #9c27b0)',
                      '&:hover': {
                        background: 'linear-gradient(to right, #1565c0, #7b1fa2)',
                      }
                    }}
                    disabled={!hasCamera}
                  >
                    Register Face
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Box>
    </Layout>
  );
};

export default Register;
