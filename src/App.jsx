// App.jsx
import React from "react";
// 1. Import Routes and Route here:
import { Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";
import Categories from "./pages/Categories";
import CreateGoal from "./pages/CreateGoal";
import Dashboard from "./pages/Dashboard";
import GoalDetails from "./pages/GoalDetails";
import Goals from "./pages/Goals";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      {/* Parent Route*/}
      <Route path="/" element={<Layout />}>
        {/* Index Route*/}
        <Route index element={<Dashboard />} />
        {/* Other Routes */}
        <Route path="goals" element={<Goals />} />
        <Route path="goals/new" element={<CreateGoal />} />
        <Route path="goals/:id" element={<GoalDetails />} />
        <Route path="categories" element={<Categories />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
