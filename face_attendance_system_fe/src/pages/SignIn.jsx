import React, { useState } from "react";
import config from "../config";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../components/Layout";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${config.backend_api}/api/auth/signin/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      // Show toast and navigate
      toast.success("Login successful!");
      setTimeout(() => navigate("/"), 100); // Small delay to ensure toast renders
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Box className="flex justify-center w-full items-center">
        <Paper
          elevation={4}
          className="p-8 w-full max-w-md rounded-xl backdrop-blur-sm"
        >
          <Breadcrumbs
            aria-label="breadcrumb"
            className="mb-4 flex justify-center"
          >
            <Link
              underline="hover"
              color="primary"
              onClick={() => navigate("/")}
              className="cursor-pointer font-semibold"
            >
              Home
            </Link>
            <Typography color="primary" className="font-semibold">
              Sign In
            </Typography>
          </Breadcrumbs>

          <Typography
            variant="h4"
            component="h1"
            className="mb-6 text-center font-bold text-primary"
          >
            Sign in to your account
          </Typography>

          {error && (
            <Typography className="mb-4 text-center text-sm text-red-500">
              {error}
            </Typography>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mb-2"
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mb-2"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              className="py-3 rounded-lg font-semibold"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
};

export default SignIn;
