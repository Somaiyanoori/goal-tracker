import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import createAppTheme from "./theme/theme";
import { getDirection } from "./theme/direction";
import i18n from "i18next";
import "./i18n";

function Root() {
  const [mode, setMode] = useState("light");       // light / dark
  const [language, setLanguage] = useState("en");  // en / fa
  const direction = getDirection(language);
  const theme = useMemo(() => createAppTheme(mode, direction), [mode, direction]);
  useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
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
ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
  <Root />
</React.StrictMode>
);