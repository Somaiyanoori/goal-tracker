import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const drawerWidth = 268;

const Layout = ({ mode, setMode, language, setLanguage }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      <Navbar
        drawerWidth={drawerWidth}
        isMobile={isMobile}
        onMenuClick={() => setOpen(true)}
        mode={mode}
        setMode={setMode}
        language={language}
        setLanguage={setLanguage}
      />

      <Sidebar
        drawerWidth={drawerWidth}
        isMobile={isMobile}
        open={open}
        onClose={() => setOpen(false)}
        mode={mode}
        setMode={setMode}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "background.default",
        }}
      >
        <Toolbar sx={{ minHeight: "66px !important" }} />
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
