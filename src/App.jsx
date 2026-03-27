import { useState, useEffect, useMemo } from "react";
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
import ProtectedRoute from "./components/ProtectedRoute";

// Context & Theme
import { GoalProvider } from "./context/GoalContext";
import createAppTheme from "./theme/theme";
import { getDirection } from "./theme/direction";
import i18n from "./i18n";

// Auth Pages
import LoginForm from "./hooks/login.jsx";
import RegisterForm from "./hooks/register.jsx";

const LS_AUTH = "auth_data";

function App() {
  const [mode, setMode] = useState("light");
  const [language, setLanguage] = useState("en");
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const direction = getDirection(language);

  const theme = useMemo(
    () => createAppTheme(mode, direction),
    [mode, direction],
  );

  // Load auth from localStorage
  useEffect(() => {
    const raw = localStorage.getItem(LS_AUTH);
    if (raw) {
      const parsed = JSON.parse(raw);
      setIsAuth(true);
      setUser(parsed.user);
    }
  }, []);

  function onLogin(userInfo) {
    const data = { user: userInfo, at: Date.now() };
    localStorage.setItem(LS_AUTH, JSON.stringify(data));
    setIsAuth(true);
    setUser(userInfo);
  }

  function onLogout() {
    localStorage.removeItem(LS_AUTH);
    setIsAuth(false);
    setUser(null);
  }

  // Checks local storage for remembering the user
  useEffect(() => {
    const raw =
      localStorage.getItem("auth_data") ||
      sessionStorage.getItem("auth_data");

    if (raw) {
      const parsed = JSON.parse(raw);
      setIsAuth(true);
      setUser(parsed);
    }
  }, []);

  // Handle direction (RTL/LTR)
  useEffect(() => {
    document.documentElement.dir = direction;
    document.body.dir = direction;
  }, [direction]);

  // Handle language change
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <GoalProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<LoginForm onLogin={onLogin} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Layout isAuth={isAuth} onLogout={onLogout} />
              </ProtectedRoute>
            }>
            <Route index element={<Dashboard user={user} />} />
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
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </GoalProvider>
  );
}

export default App;