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
import { motion } from "framer-motion";
import { Home } from "@mui/icons-material";

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

      toast.success("Login successful!");
      setTimeout(() => navigate("/"), 100);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%', maxWidth: 'sm', mx: 'auto' }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate("/")}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Typography color="text.primary">Sign In</Typography>
        </Breadcrumbs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%' }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 4,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                Sign In
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Enter your credentials to access your account
              </Typography>
            </Box>

            {error && (
              <Typography color="error" sx={{ textAlign: 'center', mb: 2 }}>
                {error}
              </Typography>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Username
                </Typography>
                <TextField
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  fullWidth
                  size="small"
                />
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Password
                </Typography>
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  fullWidth
                  size="small"
                />
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 2,
                  py: 1.5,
                  background: 'linear-gradient(to right, #1976d2, #9c27b0)',
                  '&:hover': {
                    background: 'linear-gradient(to right, #1565c0, #7b1fa2)',
                  }
                }}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </Layout>
  );
};

export default SignIn;
