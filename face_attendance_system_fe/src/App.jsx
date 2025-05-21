import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppThemeProvider } from "./AppTheme";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import MarkAttendance from "./pages/MarkAttendance";
import AllRegisteredUsers from "./pages/AllRegisteredUsers";
import AttendanceRecords from "./pages/AttendanceRecords";
import { Box } from "@mui/material";

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem("access_token");
  return accessToken ? children : <Navigate to="/signin" replace />;
};

const AppRoutes = () => (
  <Box
    component="main"
    className="main-content"
    sx={{
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingTop: "80px", // Added padding to position content below navbar
    }}
  >
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/register"
        element={
          <ProtectedRoute>
            <Registration />
          </ProtectedRoute>
        }
      />
      <Route path="/attendance" element={<MarkAttendance />} />
      <Route
        path="/all-registered-users"
        element={
          <ProtectedRoute>
            <AllRegisteredUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/attendance-records"
        element={
          <ProtectedRoute>
            <AttendanceRecords />
          </ProtectedRoute>
        }
      />
      {/* Redirect all other paths to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Box>
);

function App() {
  return (
    <ThemeProvider>
      <AppThemeProvider>
        <Box
          className="layout-container"
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            color: "text.primary",
          }}
        >
          <Router>
            <Navbar />
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#4f46e5",
                  color: "#fff",
                },
              }}
            />
            <AppRoutes />
            <Footer />
          </Router>
        </Box>
      </AppThemeProvider>
    </ThemeProvider>
  );
}

export default App;
