import React from "react";
import Navbar from "./Navbar";
import { Box } from "@mui/material";

export default function Layout({ children }) {
  return (
    <Box className="min-h-screen flex flex-col items-center pb-16">
      <Navbar />
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          mx: "auto",
          px: { xs: 2, sm: 4 },
          pt: { xs: 8, sm: 12 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
