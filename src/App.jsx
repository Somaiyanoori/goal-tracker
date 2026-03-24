import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Components & Pages
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";
import CreateGoal from "./pages/CreateGoal";
import GoalDetails from "./pages/GoalDetails";
import Categories from "./pages/Categories";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Context & Theme
import { GoalProvider } from "./context/GoalContext";
import createAppTheme from "./theme/theme";
import { getDirection } from "./theme/direction";
import i18n from "./i18n";

function App() {
  const [mode, setMode] = useState("light");
  const [language, setLanguage] = useState("en");

  const direction = getDirection(language);
  const theme = useMemo(
    () => createAppTheme(mode, direction),
    [mode, direction],
  );

  // 2. Handle Direction & Language
  useEffect(() => {
    document.documentElement.dir = direction;
    document.body.dir = direction;
  }, [direction]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <GoalProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="goals" element={<Goals />} />
            <Route path="goals/new" element={<CreateGoal />} />
            <Route path="goals/:id" element={<GoalDetails />} />
            <Route path="categories" element={<Categories />} />
            <Route
              path="settings"
              element={
                <Settings
                  mode={mode}
                  setMode={setMode}
                  language={language}
                  setLanguage={setLanguage}
                />
              }
            />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </GoalProvider>
  );
}

export default App;
