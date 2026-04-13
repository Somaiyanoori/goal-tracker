import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Grid, Paper, Box, Icon, Button } from "@mui/material";
import { useGoals } from "../context/GoalContext";
import GoalCard from "../components/GoalCard";
import { calculateOverallCompletion, calculateOverallStreak} from "../utils/calculation";

// Helper component for stat cards
const StatCard = ({ title, value, icon, color }) => (
  <Paper
    elevation={0}
    variant="outlined"
    sx={{ p: 2, display: "flex", alignItems: "center", height: "100%" }}
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
  const { goals, userStats } = useGoals();
  const overallCompletion = useMemo(
    () => calculateOverallCompletion(goals),
    [goals],
  );
  const streak = useMemo(() => calculateOverallStreak(goals), [goals]);
  const activeGoals = goals.filter((g) => g.status === "active").slice(0, 6);

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Dashboard Overview
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Overall Completion"
            value={`${overallCompletion}%`}
            icon="checklist"
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Current Streak"
            value={`${streak} Days`}
            icon="local_fire_department"
            color="error"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total XP"
            value={userStats.xp}
            icon="star"
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Goals Completed"
            value={userStats.completedCount}
            icon="emoji_events"
            color="success"
          />
        </Grid>
      </Grid>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Active Goals
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
          sx={{ p: 4, textAlign: "center", backgroundColor: "background.default", color: "text.primary" }}
          variant="outlined"
        >
          <Typography variant="h6">No active goals yet.</Typography>
          <Typography color="text.secondary">
            Create a new goal to get started!
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/goals/new"
          >
            Create Goal
          </Button>
        </Paper>
      )}
    </Container>
  );
};

export default Dashboard;
