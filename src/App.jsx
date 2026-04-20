import { useEffect, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import createEmotionCache from "./createEmotionCache";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";
import CreateGoal from "./pages/CreateGoal";
import GoalDetails from "./pages/GoalDetails";
import Categories from "./pages/Categories";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import EditGoal from "./pages/EditGoal";
import { GoalProvider } from "./context/GoalContext";
import createAppTheme from "./theme/theme";
import { getDirection } from "./theme/direction";
import i18n from "./i18n";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [mode, setMode] = useLocalStorage("themeMode", "light");
  const [language, setLanguage] = useLocalStorage("appLanguage", "en");

  const direction = getDirection(language);
  const theme = useMemo(
    () => createAppTheme(mode, direction),
    [mode, direction],
  );
  const emotionCache = useMemo(
    () => createEmotionCache(direction),
    [direction],
  );

  useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GoalProvider>
          <Routes>
            <Route
              path="/"
              element={
                <Layout
                  mode={mode}
                  setMode={setMode}
                  language={language}
                  setLanguage={setLanguage}
                />
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="goals" element={<Goals />} />
              <Route path="goals/new" element={<CreateGoal />} />
              <Route path="goals/:id" element={<GoalDetails />} />
              <Route path="goals/:id/edit" element={<EditGoal />} />
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
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </GoalProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
