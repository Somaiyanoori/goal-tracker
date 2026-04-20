import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
  Stack,
  alpha,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import AppLogo from "../assets/logo.png";

export default function Navbar({
  drawerWidth,
  isMobile,
  onMenuClick,
  mode,
  setMode,
  language,
  setLanguage,
}) {
  const theme = useTheme();
  const primaryGradient = `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`;

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        backgroundColor: alpha(theme.palette.background.paper, 0.85),
        backdropFilter: "blur(8px)",
        color: "text.primary",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ minHeight: "66px !important" }}>
        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Stack
          direction="row"
          alignItems="center"
          spacing={1.2}
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "10px",
              border: `1.5px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              backgroundColor: "background.paper",
              flexShrink: 0,
            }}
          >
            <img
              src={AppLogo}
              alt="Logo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
          <Typography
            variant="h6"
            fontWeight={900}
            sx={{
              background: primaryGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            GoalTracker
          </Typography>
        </Stack>

        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <LanguageToggle language={language} setLanguage={setLanguage} />
          <ThemeToggle mode={mode} setMode={setMode} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
