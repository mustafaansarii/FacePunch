import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Registration from "./pages/Registration";
import MarkAttendance from "./pages/MarkAttendance";
import AllRegisteredUsers from "./pages/AllRegisteredUsers";
import AttendanceRecords from "./pages/AttendanceRecords";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppThemeProvider } from "./AppTheme";

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem("access_token");
  return accessToken ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <ThemeProvider>
      <AppThemeProvider>
        <Router>
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
        </Router>
      </AppThemeProvider>
    </ThemeProvider>
  );
}

export default App;
