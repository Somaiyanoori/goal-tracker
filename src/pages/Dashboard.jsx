import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Stack,
  Divider,
  LinearProgress,
  Paper,
  useTheme,
  alpha,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGoals } from "../hooks/useGoals";
import GoalCard from "../components/GoalCard";
import { calculateOverallCompletion } from "../utils/calculation";

// --- FIXED COMPONENT ---
const StatCard = ({ label, value, icon, gradient, shadowColor }) => {
  // Use the theme hook to access palette
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderRadius: "22px",
        background: gradient,
        boxShadow: (theme) =>
          `0 8px 28px ${alpha(shadowColor, theme.palette.mode === "dark" ? 0.4 : 0.3)}`,
        p: 3,
        display: "flex",
        alignItems: "center",
        gap: 2,
        color: "primary.contrastText",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: (theme) =>
            `0 18px 40px ${alpha(shadowColor, theme.palette.mode === "dark" ? 0.45 : 0.35)}`,
        },
      }}
    >
      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: "16px",
          backgroundColor: alpha(theme.palette.common.white, 0.22),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          variant="body2"
          sx={{
            color: alpha(theme.palette.primary.contrastText, 0.82),
            fontWeight: 600,
            mb: 0.3,
          }}
        >
          {label}
        </Typography>
        <Typography variant="h5">{value}</Typography>
      </Box>
    </Box>
  );
};
const CompletedRow = ({ goal }) => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        px: 2.5,
        py: 1.8,
        borderRadius: "16px",
        backgroundColor: "background.paper",
        boxShadow: (theme) => theme.shadows[1],
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateX(4px)",
          boxShadow: (theme) => theme.shadows[4],
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "12px",
            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckCircleRoundedIcon
            sx={{ color: "primary.contrastText", fontSize: 20 }}
          />
        </Box>
        <Box>
          <Typography variant="body1" fontWeight={700}>
            {goal.title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {goal.category}
          </Typography>
        </Box>
      </Stack>
      <Box
        sx={{
          px: 1.5,
          py: 0.5,
          borderRadius: "20px",
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
        }}
      >
        <Typography
          variant="caption"
          fontWeight={700}
          sx={{ color: "primary.dark" }}
        >
          100%
        </Typography>
      </Box>
    </Stack>
  );
};

const Dashboard = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { goals, userStats, activeGoals, completedGoals } = useGoals();

  const displayedActive = activeGoals.slice(0, 6);
  const displayedCompleted = completedGoals.slice(0, 3);
  const overallCompletion = useMemo(
    () => calculateOverallCompletion(goals),
    [goals],
  );
  const streak = userStats.streak ?? 0;

  const statCards = [
    {
      key: "completion",
      label: t("overall_completion"),
      value: `${overallCompletion}%`,
      icon: <TrendingUpRoundedIcon />,
      gradient: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
      shadowColor: theme.palette.primary.main,
    },
    {
      key: "streak",
      label: t("current_streak"),
      value: `${streak} ${t("days_streak")}`,
      icon: <LocalFireDepartmentRoundedIcon />,
      gradient: `linear-gradient(135deg, ${theme.palette.secondary.dark}, ${theme.palette.secondary.main})`,
      shadowColor: theme.palette.secondary.main,
    },
    {
      key: "xp",
      label: t("total_xp"),
      value: `${userStats.xp} XP`,
      icon: <StarRoundedIcon />,
      gradient: `linear-gradient(135deg, ${theme.palette.warning.dark}, ${theme.palette.warning.main})`,
      shadowColor: theme.palette.warning.main,
    },
    {
      key: "completed",
      label: t("goals_completed"),
      value: userStats.completedCount,
      icon: <EmojiEventsRoundedIcon />,
      gradient: `linear-gradient(135deg, ${theme.palette.success.dark}, ${theme.palette.success.main})`,
      shadowColor: theme.palette.success.main,
    },
  ];

  const primaryGradient = `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`;
  const primaryShadow = alpha(
    theme.palette.primary.main,
    theme.palette.mode === "dark" ? 0.35 : 0.3,
  );

  const softBtnSx = {
    borderRadius: "14px",
    border: "none",
    backgroundColor: alpha(theme.palette.text.primary, 0.04),
    color: "text.secondary",
    "&:hover": {
      backgroundColor: alpha(theme.palette.text.primary, 0.08),
      border: "none",
    },
  };

  return (
    <Container maxWidth="lg">
      <Box mb={4}>
        <Typography variant="h4">{t("dashboard")}</Typography>
        <Typography variant="body1" color="text.secondary" mt={0.5}>
          {t("welcome_sub")}
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((card) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.key}>
            <StatCard
              label={card.label}
              value={card.value}
              icon={card.icon}
              gradient={card.gradient}
              shadowColor={card.shadowColor}
            />
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 3.5, mb: 4, borderRadius: "24px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2.5}
        >
          <Box>
            <Typography variant="h6">{t("overall_progress")}</Typography>
            <Typography variant="body2" color="text.secondary">
              {activeGoals.length} {t("active_goals").toLowerCase()}{" "}
              {t("in_progress")}
            </Typography>
          </Box>
          <Typography
            variant="h3"
            fontWeight={900}
            sx={{
              background: primaryGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {overallCompletion}%
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={overallCompletion}
          sx={{
            height: 14,
            borderRadius: 10,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            "& .MuiLinearProgress-bar": {
              background: primaryGradient,
              borderRadius: 10,
            },
          }}
        />
      </Paper>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          {t("quick_actions")}
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddRoundedIcon />}
            component={Link}
            to="/goals/new"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: "16px",
              background: primaryGradient,
              boxShadow: `0 6px 20px ${primaryShadow}`,
              border: "none",
              "&:hover": {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                boxShadow: `0 10px 28px ${primaryShadow}`,
              },
            }}
          >
            {t("new_goal")}
          </Button>
          <Button
            size="large"
            startIcon={<FormatListBulletedRoundedIcon />}
            component={Link}
            to="/goals"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: "16px",
              border: "none",
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: "primary.dark",
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.18),
                border: "none",
              },
            }}
          >
            {t("view_all_goals")}
          </Button>
        </Stack>
      </Box>

      <Divider sx={{ mb: 4, opacity: 0.3 }} />

      <Box mb={4}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box>
            <Typography variant="h5">{t("active_goals")}</Typography>
            <Typography variant="body2" color="text.secondary">
              {activeGoals.length} {t("in_progress")}
            </Typography>
          </Box>
          {activeGoals.length > 0 && (
            <Button component={Link} to="/goals" size="small" sx={softBtnSx}>
              {t("see_all")} &rarr;
            </Button>
          )}
        </Stack>
        {displayedActive.length > 0 ? (
          <Grid container spacing={3}>
            {displayedActive.map((goal) => (
              <Grid key={goal.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <GoalCard goal={goal} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              p: 7,
              textAlign: "center",
              borderRadius: "24px",
              background: alpha(theme.palette.primary.main, 0.03),
              border: `2px dashed ${alpha(theme.palette.primary.main, 0.12)}`,
            }}
          >
            <Typography variant="h6" mb={1}>
              {t("no_goals_title")}
            </Typography>
            <Typography color="text.secondary" mb={3}>
              {t("no_goals_sub")}
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/goals/new"
              startIcon={<AddRoundedIcon />}
              size="large"
              sx={{
                borderRadius: "14px",
                background: primaryGradient,
                boxShadow: `0 6px 20px ${primaryShadow}`,
                border: "none",
              }}
            >
              {t("create_first")}
            </Button>
          </Box>
        )}
      </Box>

      <Divider sx={{ mb: 4, opacity: 0.3 }} />

      <Box mb={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box>
            <Typography variant="h5">{t("recently_completed")}</Typography>
            <Typography variant="body2" color="text.secondary">
              {completedGoals.length} {t("goals_finished")}
            </Typography>
          </Box>
          {completedGoals.length > 0 && (
            <Button component={Link} to="/goals" size="small" sx={softBtnSx}>
              {t("view_archive")} &rarr;
            </Button>
          )}
        </Stack>
        {displayedCompleted.length > 0 ? (
          <Stack spacing={1.5}>
            {displayedCompleted.map((goal) => (
              <CompletedRow key={goal.id} goal={goal} />
            ))}
            {completedGoals.length > 3 && (
              <Button
                component={Link}
                to="/goals"
                fullWidth
                sx={{ ...softBtnSx, py: 1.5, borderRadius: "16px", mt: 1 }}
              >
                {t("view_all")} ({completedGoals.length})
              </Button>
            )}
          </Stack>
        ) : (
          <Box
            sx={{
              p: 5,
              textAlign: "center",
              borderRadius: "24px",
              background: alpha(theme.palette.success.main, 0.03),
              border: `2px dashed ${alpha(theme.palette.success.main, 0.12)}`,
            }}
          >
            <Typography variant="body1" color="text.secondary" fontWeight={500}>
              {t("no_goals_sub")}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
