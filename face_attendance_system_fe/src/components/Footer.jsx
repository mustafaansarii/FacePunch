import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{
        width: '100%',
        py: 2,
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        mt: 'auto',
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Box sx={{
        maxWidth: '1280px',
        mx: 'auto',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Typography variant="caption" sx={{ 
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '0.75rem',
        }}>
          © 2025 All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
