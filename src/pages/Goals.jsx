import { useState } from "react";
import { Container, Typography, Grid, Tabs, Tab, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useGoals } from "../context/GoalContext";
import GoalCard from "../components/GoalCard";

const Goals = () => {
  const { goals } = useGoals();
  const [filter, setFilter] = useState("all");
  const handleChange = (e, newValue) => {
    setFilter(newValue);
  };
  const filteredGoals = goals.filter(
    (g) => filter === "all" || g.status === filter
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        All Goals
      </Typography>
      <Tabs value={filter} onChange={handleChange} sx={{ mb: 3 }}>
        <Tab label="All" value="all" />
        <Tab label="Active" value="active" />
        <Tab label="Completed" value="completed" />
        <Tab label="Paused" value="paused" />
      </Tabs>
      {filteredGoals.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }} variant="outlined">
          <Typography variant="h6">No goals found.</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Let's create one!
          </Typography>
          <Button variant="contained" component={Link} to="/goals/new">
            Create Goal
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredGoals.map((goal, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <GoalCard goal={goal} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Goals;