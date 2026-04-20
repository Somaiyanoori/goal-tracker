import { useMemo } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Stack,
  LinearProgress,
  Paper,
  useTheme,
  alpha,
  Divider,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";

import { useGoals } from "../hooks/useGoals";
import { CATEGORIES } from "../utils/constants";
import { calculateProgress } from "../utils/calculation";

const CATEGORY_ICONS = {
  Health: <HealthAndSafetyRoundedIcon sx={{ fontSize: 40 }} />,
  Study: <SchoolRoundedIcon sx={{ fontSize: 40 }} />,
  Work: <WorkRoundedIcon sx={{ fontSize: 40 }} />,
  Personal: <PersonRoundedIcon sx={{ fontSize: 40 }} />,
  Finance: <AttachMoneyRoundedIcon sx={{ fontSize: 40 }} />,
  Default: <CategoryRoundedIcon sx={{ fontSize: 40 }} />,
};

// --- FIXED COMPONENT ---
const CategoryCard = ({ name, icon, stats, gradient, shadowColor }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { active, completed, total, overallProgress } = stats;
  const statsData = [
    {
      label: t("total_goals"),
      value: total,
      color: theme.palette.text.primary,
    },
    { label: t("active"), value: active, color: theme.palette.success.main },
    { label: t("completed"), value: completed, color: theme.palette.info.main },
  ];

  return (
    <Paper
      sx={{
        borderRadius: "16px",
        overflow: "hidden",
        border: "none",
        height: "100%",
        boxShadow: `0 4px 24px ${alpha(shadowColor, theme.palette.mode === "dark" ? 0.3 : 0.1)}`,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: `0 20px 48px ${alpha(shadowColor, theme.palette.mode === "dark" ? 0.4 : 0.15)}`,
        },
      }}
    >
      <Box sx={{ height: 8, background: gradient }} />
      <Box sx={{ p: { xs: 3, sm: 4 } }}>
        <Stack direction="row" alignItems="center" spacing={2.5} mb={3.5}>
          <Box
            sx={{
              width: 68,
              height: 68,
              borderRadius: "16px",
              background: gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // Use the theme's contrast text instead of hardcoded "#fff"
              color: "primary.contrastText",
              flexShrink: 0,
              boxShadow: `0 8px 20px ${alpha(shadowColor, 0.4)}`,
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography variant="h5">{t(name.toLowerCase())}</Typography>
            <Typography variant="body1" color="text.secondary">
              {total} {t("total_goals").toLowerCase()}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 3, opacity: 0.3 }} />

        <Stack spacing={2} mb={3.5}>
          {statsData.map((item) => (
            <Stack
              key={item.label}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="body1"
                color="text.secondary"
                fontWeight={600}
              >
                {item.label}
              </Typography>
              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "12px",
                  backgroundColor: alpha(item.color, 0.1),
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight={700}
                  sx={{ color: item.color }}
                >
                  {item.value}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
        <Box>
          <Stack direction="row" justifyContent="space-between" mb={1.5}>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              {t("overall_progress_label", "Overall Progress")}
            </Typography>
            <Typography variant="body1" fontWeight={800} color="primary.main">
              {overallProgress}%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={overallProgress}
            sx={{
              height: 12,
              borderRadius: 6,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              "& .MuiLinearProgress-bar": {
                background: gradient,
                borderRadius: 6,
              },
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};
// --- END OF FIXED COMPONENT ---

const Categories = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { goals } = useGoals();

  const categoryStats = useMemo(() => {
    const stats = {};
    CATEGORIES.forEach((cat) => {
      stats[cat] = {
        active: 0,
        completed: 0,
        total: 0,
        totalProgress: 0,
        activeCount: 0,
        overallProgress: 0,
      };
    });
    goals.forEach((goal) => {
      if (stats[goal.category]) {
        stats[goal.category].total++;
        if (goal.status === "active") {
          stats[goal.category].active++;
          stats[goal.category].activeCount++;
          stats[goal.category].totalProgress += calculateProgress(
            goal.progress,
            goal.target,
          );
        } else if (goal.status === "completed") {
          stats[goal.category].completed++;
        }
      }
    });
    Object.values(stats).forEach((s) => {
      if (s.activeCount > 0)
        s.overallProgress = Math.round(s.totalProgress / s.activeCount);
      else if (s.total > 0 && s.active === 0)
        s.overallProgress = s.completed > 0 ? 100 : 0;
    });
    return stats;
  }, [goals]);

  const gradients = [
    `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
    `linear-gradient(135deg, ${theme.palette.secondary.dark}, ${theme.palette.secondary.main})`,
  ];
  const shadowColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
  ];

  return (
    <Container maxWidth="lg">
      <Box mb={4}>
        <Typography variant="h4">{t("categories")}</Typography>
        <Typography variant="body1" color="text.secondary" mt={0.5}>
          {t("categories_subtitle", "See how your goals are distributed.")}
        </Typography>
      </Box>
      {goals.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            py: 8,
            textAlign: "center",
            borderRadius: "16px",
            borderColor: "divider",
          }}
        >
          <Typography variant="h6" mb={1}>
            {t("no_goals_title")}
          </Typography>
          <Typography color="text.secondary">{t("no_goals_sub")}</Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {CATEGORIES.map((cat, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cat}>
              <CategoryCard
                name={cat}
                icon={CATEGORY_ICONS[cat] || CATEGORY_ICONS.Default}
                stats={categoryStats[cat]}
                gradient={gradients[index % gradients.length]}
                shadowColor={shadowColors[index % shadowColors.length]}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Categories;
