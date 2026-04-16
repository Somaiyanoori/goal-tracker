import { Link, NavLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Button, Box, useTheme, useMediaQuery} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslation } from "react-i18next";
export default function Navbar({ isAuth, onLogout, onMenuClick }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();
  const handleLogout = () => {
    onLogout();
    navigate("/", { replace: true });
  };
  const navLinks = [
    { label: "Dashboard", path: "/" },
    { label: "All Goals", path: "/goals" },
    { label: "Create Goals", path: "/goals/new" },
    { label: "Categories", path: "/categories" },
    { label: "Settings", path: "/settings" },
  ];
  return (
    <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {isMobile && (
            <IconButton color="inherit" onClick={onMenuClick}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "inherit", fontWeight: 700 }}
          >
            {t("goal_tracker")}
          </Typography>
        </Box>
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {navLinks.map((link) => (
              <Button
                key={link.path}
                component={NavLink}
                to={link.path}
                sx={{ color: "inherit", "&.active": { fontWeight: "bold", textDecoration: "underline" }}}
              >
                {link.label}
              </Button>
            ))}
            {isAuth ? (
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="inherit"
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}