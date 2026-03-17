import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import createAppTheme from "./theme/theme";
import { getDirection } from "./theme/direction";
import "./i18n";  

function Root() {
  const [mode, setMode] = useState("light");       // light / dark
  const [language, setLanguage] = useState("en");  // en / fa
  const direction = getDirection(language);
  const theme = createAppTheme(mode, direction);
  useEffect(() => {
    document.body.dir = direction; 
  }, [direction]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App
          mode={mode}
          setMode={setMode}
          language={language}
          setLanguage={setLanguage}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
