import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@mui/material";

export default function Layout({ children }) {
  return (
    <Box
      className="layout-container"
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Navbar />
      <Box
        component="main"
        className="main-content"
        sx={{
          flex: 1,
          bgcolor: "background.paper",
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
