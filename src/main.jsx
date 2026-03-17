import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";
import createAppTheme from "./theme/theme";
import { getDirection } from "./theme/direction";
import "./i18n";
import "./index.css";

function Root() {
  const [mode, setMode] = useState("light");
  const [language, setLanguage] = useState("en");

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
