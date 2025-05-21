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
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
import toast from "react-hot-toast";
import HomeIcon from "@mui/icons-material/Home";

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
    <Box className="w-full p-6 flex justify-center">
      <Box maxWidth="1200px" className="w-full">
        <Box className="flex justify-between items-center mb-6">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              onClick={() => navigate("/")}
              className="cursor-pointer flex items-center"
            >
              <HomeIcon className="mr-1" fontSize="small" />
              Home
            </Link>
            <Typography color="text.primary">Attendance Records</Typography>
          </Breadcrumbs>
        </Box>

        <Card className="border border-gray-200 shadow-xl">
          <CardHeader
            title="Attendance Records"
            subheader="View all attendance records tracked by the system"
            titleTypographyProps={{ variant: "h4", fontWeight: 700 }}
          />
          <CardContent>
            {loading ? (
              <Box className="flex justify-center items-center h-40">
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer
                component={Paper}
                className="rounded-md"
                sx={{ border: 1, borderColor: "divider" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Last Attendance Date</TableCell>
                      <TableCell>Last Attendance Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {records.map((record) => (
                      <TableRow key={record.id} hover>
                        <TableCell>{record.id}</TableCell>
                        <TableCell>{record.name}</TableCell>
                        <TableCell>{record.email}</TableCell>
                        <TableCell>{record.last_attendance_date}</TableCell>
                        <TableCell>{record.last_attendance_time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AttendanceRecords;
