import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Breadcrumbs,
  Link,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
import toast from "react-hot-toast";
import Layout from "../components/Layout";

const AttendanceRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await axios.get(
          `${config.backend_api}/api/features/attendance-records/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setRecords(response.data);
      } catch (err) {
        toast.error("Failed to fetch attendance records");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  return (
    <Layout>
      <Box className="w-full p-6" sx={{ color: "#fff" }}>
        <Breadcrumbs aria-label="breadcrumb" className="mb-6" sx={{ color: "#fff" }}>
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate("/")}
            className="cursor-pointer"
            sx={{ color: "#fff" }}
          >
            Home
          </Link>
          <Typography color="text.primary" sx={{ color: "#fff" }}>
            Attendance Records
          </Typography>
        </Breadcrumbs>

        <Typography
          variant="h4"
          component="h1"
          className="mb-8 font-bold text-primary"
          sx={{ color: "#fff" }}
        >
          Attendance Records
        </Typography>

        {loading ? (
          <Box className="flex justify-center">
            <CircularProgress sx={{ color: "#fff" }} />
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            elevation={4}
            className="rounded-xl backdrop-blur-sm overflow-x-auto"
            sx={{
              backgroundColor: "rgba(30,30,30,0.85)",
              color: "#fff",
            }}
          >
            <Table className="min-w-full" aria-label="attendance records">
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold" sx={{ color: "#fff", fontWeight: "bold" }}>ID</TableCell>
                  <TableCell className="font-bold" sx={{ color: "#fff", fontWeight: "bold" }}>Name</TableCell>
                  <TableCell className="font-bold" sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
                  <TableCell className="font-bold" sx={{ color: "#fff", fontWeight: "bold" }}>
                    Last Attendance Date
                  </TableCell>
                  <TableCell className="font-bold" sx={{ color: "#fff", fontWeight: "bold" }}>
                    Last Attendance Time
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((record) => (
                  <TableRow
                    key={record.id}
                    className="hover:bg-gray-50"
                    sx={{
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" }
                    }}
                  >
                    <TableCell sx={{ color: "#fff" }}>{record.id}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{record.name}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{record.email}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{record.last_attendance_date}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{record.last_attendance_time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Layout>
  );
};

export default AttendanceRecords;
