import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Divider,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useGoals } from "../hooks/useGoals";
import AppLogo from "../assets/logo.png";

const menuItems = [
  { key: "dashboard", path: "/", icon: <DashboardRoundedIcon /> },
  { key: "all_goals", path: "/goals", icon: <ListAltRoundedIcon /> },
  { key: "create_goal", path: "/goals/new", icon: <AddCircleRoundedIcon /> },
  { key: "categories", path: "/categories", icon: <CategoryRoundedIcon /> },
  { key: "settings", path: "/settings", icon: <SettingsRoundedIcon /> },
];

export default function Sidebar({
  drawerWidth,
  isMobile,
  open,
  onClose,
  mode,
  setMode,
  language,
  setLanguage,
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { userStats } = useGoals();
  const isDark = mode === "dark";

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  // --- REFACTORED: Use theme palette for all colors ---
  const primaryGradient = `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`;
  const activeItemBg = alpha(theme.palette.primary.main, 0.12);
  const activeItemColor = theme.palette.primary.main;
  const sidebarBg = isDark
    ? `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${theme.palette.background.paper} 100%)`
    : `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`;

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: sidebarBg,
      }}
    >
      {/* Logo Section */}
      <Box sx={{ px: 3, py: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
              border: `1.5px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              backgroundColor: "background.paper",
              flexShrink: 0,
            }}
          >
            <img
              src={AppLogo}
              alt="GoalTracker Logo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
          <Box>
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
            <Typography variant="caption" color="text.secondary">
              {t("overview")}
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Divider sx={{ mx: 2, opacity: 0.3, borderColor: "divider" }} />

      {/* XP Stats Strip */}
      <Box
        sx={{
          mx: 2,
          mt: 2,
          mb: 1,
          p: 2,
          borderRadius: "16px",
          background: alpha(theme.palette.primary.main, 0.08),
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing={0.3}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={600}
            >
              {t("total_xp")}
            </Typography>
            <Typography
              variant="body1"
              fontWeight={800}
              sx={{ color: "primary.dark" }}
            >
              {userStats.xp} XP
            </Typography>
          </Stack>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ opacity: 0.3, mx: 1, borderColor: "divider" }}
          />
          <Stack spacing={0.3} alignItems="flex-end">
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={600}
            >
              {t("current_streak")}
            </Typography>
            <Typography
              variant="body1"
              fontWeight={800}
              sx={{ color: "primary.dark" }}
            >
              {userStats.streak} {t("days_streak")}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Navigation */}
      <List sx={{ px: 2, pt: 1, flex: 1 }}>
        {menuItems.map((item) => {
          const active = isActive(item.path);
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) onClose();
                }}
                sx={{
                  borderRadius: "14px",
                  backgroundColor: active ? activeItemBg : "transparent",
                  "&:hover": {
                    backgroundColor: active
                      ? activeItemBg
                      : theme.palette.action.hover,
                  },
                }}
              >
                {active && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      top: "20%",
                      bottom: "20%",
                      width: 4,
                      borderRadius: "0 4px 4px 0",
                      background: primaryGradient,
                    }}
                  />
                )}
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: active ? activeItemColor : "text.secondary",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={t(item.key)}
                  primaryTypographyProps={{
                    fontWeight: active ? 700 : 500,
                    color: active ? activeItemColor : "text.primary",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ mx: 2, opacity: 0.3, borderColor: "divider" }} />

      {/* Bottom Controls */}
      <Box sx={{ px: 2, py: 2 }}>
        <Stack direction="row" spacing={1} justifyContent="center">
          <ThemeToggle mode={mode} setMode={setMode} />
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{ "& .MuiDrawer-paper": { width: drawerWidth } }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{ "& .MuiDrawer-paper": { width: drawerWidth, border: "none" } }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
}
