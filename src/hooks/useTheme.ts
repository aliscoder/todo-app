import { useState, useCallback } from "react";
import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = useCallback(
    () => setIsDarkMode(!isDarkMode),
    [isDarkMode]
  );

  return {
    isDarkMode,
    theme: isDarkMode ? darkTheme : lightTheme,
    toggleTheme,
  };
};
