import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Icon,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGoals } from "../context/GoalContext";
import GoalCard from "../components/GoalCard";
import {
  calculateOverallCompletion,
  calculateOverallStreak,
} from "../utils/calculation";

// Helper component for stat cards
const StatCard = ({ title, value, icon, color }) => (
  <Paper
    elevation={0}
    variant="outlined"
    sx={{
      p: 2,
      display: "flex",
      alignItems: "center",
      height: "100%",
    }}
  >
    <Box
      sx={{
        p: 1.5,
        backgroundColor: `${color}.main`,
        color: "white",
        borderRadius: "12px",
        mr: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Icon>{icon}</Icon>
    </Box>

    <Box>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>

      <Typography variant="h5" fontWeight="bold">
        {value}
      </Typography>
    </Box>
  </Paper>
);

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const { goals, userStats } = useGoals();
  const overallCompletion = useMemo(
    () => calculateOverallCompletion(goals),
    [goals]
  );
  const streak = useMemo(
    () => calculateOverallStreak(goals),
    [goals]
  );
  const activeGoals = goals
    .filter((g) => g.status === "active")
    .slice(0, 6);
  const isFa = i18n.language === "fa";

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {t("dashboard_overview")}
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={t("overall_completion")}
            value={`${overallCompletion}%`}
            icon="checklist"
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={t("current_streak")}
            value={
              isFa
                ? `${streak} ${t("days")}`
                : `${streak} ${t("days")}`
            }
            icon="local_fire_department"
            color="error"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={t("total_xp")}
            value={userStats.xp}
            icon="star"
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={t("goals_completed")}
            value={userStats.completedCount}
            icon="emoji_events"
            color="success"
          />
        </Grid>
      </Grid>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {t("active_goals")}
      </Typography>
      {activeGoals.length > 0 ? (
        <Grid container spacing={3}>
          {activeGoals.map((goal) => (
            <Grid item xs={12} sm={6} md={4} key={goal.id}>
              <GoalCard goal={goal} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper
          variant="outlined"
          sx={{
            p: 4,
            textAlign: "center",
            backgroundColor: "background.default",
            color: "text.primary",
          }}
        >
          <Typography variant="h6">
            {t("no_active_goals")}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {t("create_goal_message")}
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/goals/new"
          >
            {t("create_goal")}
          </Button>
        </Paper>
      )}
    </Container>
  );
};

export default Dashboard;