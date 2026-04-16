// src/pages/Categories.jsx

import React, { useMemo } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
  Icon,
  Stack,
  LinearProgress,
} from "@mui/material";
import { useGoals } from "../context/GoalContext";
import { CATEGORIES } from "../utils/constants";
import { calculateProgress } from "../utils/calculation";

// A dictionary to map category names to relevant icons
const categoryIcons = {
  Health: "fitness_center",
  Study: "school",
  Work: "work",
  Personal: "person",
  Finance: "account_balance_wallet",
  Default: "category", // A fallback icon
};

// Reusable component for displaying a category card
const CategoryCard = ({ categoryName, stats }) => {
  const { active, completed, total, overallProgress } = stats;
  const icon = categoryIcons[categoryName] || categoryIcons.Default;

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 4, // Slightly more rounded
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Icon color="primary" sx={{ fontSize: 32 }}>
            {icon}
          </Icon>
          <Typography variant="h5" fontWeight="bold">
            {categoryName}
          </Typography>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Stack spacing={1.5}>
          <Typography variant="body1">
            <strong>Total Goals:</strong> {total}
          </Typography>
          <Typography variant="body1">
            <strong>Active:</strong> {active}
          </Typography>
          <Typography variant="body1">
            <strong>Completed:</strong> {completed}
          </Typography>
        </Stack>
      </Box>
      <Box mt={3}>
        <Typography variant="body2" color="text.secondary">
          Overall Progress
        </Typography>
        <LinearProgress
          variant="determinate"
          value={overallProgress}
          sx={{ height: 8, borderRadius: 4, mt: 0.5 }}
        />
      </Box>
    </Paper>
  );
};

// Main component for the Categories page
const Categories = () => {
  const { goals } = useGoals();

  const categoryStats = useMemo(() => {
    const stats = {};
    CATEGORIES.forEach((cat) => {
      stats[cat] = {
        active: 0,
        completed: 0,
        total: 0,
        totalProgress: 0,
        activeGoalsCount: 0,
        overallProgress: 0,
      };
    });

    goals.forEach((goal) => {
      const category = goal.category;
      if (stats[category]) {
        stats[category].total++;
        if (goal.status === "active") {
          stats[category].active++;
          stats[category].totalProgress += calculateProgress(
            goal.progress,
            goal.target,
          );
          stats[category].activeGoalsCount++;
        } else if (goal.status === "completed") {
          stats[category].completed++;
        }
      }
    });

    for (const cat in stats) {
      const stat = stats[cat];
      if (stat.activeGoalsCount > 0) {
        stat.overallProgress = Math.round(
          stat.totalProgress / stat.activeGoalsCount,
        );
      } else if (stat.total > 0 && stat.active === 0) {
        stat.overallProgress = 100; // All goals are completed
      }
    }
    return stats;
  }, [goals]);

  const hasAnyGoals = goals.length > 0;

  return (
    // We use maxWidth="md" to make the content area a bit narrower, forcing the cards to be bigger.
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Categories Overview
      </Typography>

      {hasAnyGoals ? (
        <Grid container spacing={4}>
          {CATEGORIES.map((category) => (
            <Grid item xs={12} sm={6} key={category}>
              {/* xs=12 -> 1 card/row on mobile. sm=6 -> 2 cards/row on tablet & desktop */}
              <CategoryCard
                categoryName={category}
                stats={categoryStats[category]}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper
          sx={{ p: 5, textAlign: "center", mt: 3, border: "1px dashed #ccc" }}
        >
          <Typography variant="h6">No Goals Found.</Typography>
          <Typography color="text.secondary">
            Create a new goal to see category statistics here.
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default Categories;
