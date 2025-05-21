import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    // Read theme mode from local storage on initial load
    const storedThemeMode = localStorage.getItem("themeMode");
    return storedThemeMode ? storedThemeMode : "light";
  });

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    // Update local storage whenever themeMode changes
    localStorage.setItem("themeMode", themeMode);
    document.body.className = `${themeMode}-mode`;
    document.documentElement.className = themeMode;
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
