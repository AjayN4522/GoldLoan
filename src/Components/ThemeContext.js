import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Load the initial theme from localStorage (or use defaults if not set)
  const loadThemeFromStorage = () => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      return JSON.parse(storedTheme);
    } else {
      // Default theme if nothing is in localStorage
      return {
        font: "Poppins",
        colors: {
          background: "#211951",
          primary: "#836FFF",
          secondary: "#FF9A00",
          tertiary: "#EEF5FF",
        },
      };
    }
  };

  const [theme, setTheme] = useState(loadThemeFromStorage);

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    // Save the new theme to localStorage
    localStorage.setItem("theme", JSON.stringify(newTheme));
  };

  useEffect(() => {
    // Apply theme to CSS variables when theme changes
    document.documentElement.style.setProperty("--font", theme.font);
    document.documentElement.style.setProperty("--primary-color", theme.colors.primary);
    document.documentElement.style.setProperty("--secondary-color", theme.colors.secondary);
    document.documentElement.style.setProperty("--tertiary-color", theme.colors.tertiary);
    document.documentElement.style.setProperty("--background-color", theme.colors.background);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
