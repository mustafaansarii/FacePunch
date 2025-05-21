import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { useTheme } from "./contexts/ThemeContext";
import { ThemeProvider } from "@mui/material/styles";

const createAppTheme = (mode) => {
  const isDark = mode === "dark";

  let theme = createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? "#6366f1" : "#4f46e5", // CareerHubs purple
      },
      secondary: {
        main: isDark ? "#f472b6" : "#ec4899", // CareerHubs pink
      },
      background: {
        default: isDark ? "#0f172a" : "#f9fafb", // Dark: slate-900, Light: gray-50
        paper: isDark ? "#1e293b" : "#ffffff", // Dark: slate-800, Light: white
      },
      text: {
        primary: isDark ? "#f8fafc" : "#1e293b", // Dark: slate-50, Light: slate-900
        secondary: isDark ? "#94a3b8" : "#64748b", // Dark: slate-400, Light: slate-500
        disabled: isDark ? "#64748b" : "#94a3b8",
      },
      divider: isDark ? "#334155" : "#e2e8f0", // Dark: slate-700, Light: slate-200
    },
    typography: {
      fontFamily: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "6px",
            padding: "8px 16px",
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: "small",
          variant: "outlined",
        },
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "6px",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          },
        },
      },
    },
  });

  return responsiveFontSizes(theme);
};

// Create a wrapper component that uses the theme context
export const AppThemeProvider = ({ children }) => {
  const { themeMode } = useTheme();
  const theme = responsiveFontSizes(createAppTheme(themeMode));

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default createAppTheme;
