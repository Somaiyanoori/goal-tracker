import { Container, Typography, Grid } from "@mui/material";
import { useGoals } from "../context/GoalContext";
import GoalCard from "../components/GoalCard";

const Goals = () => {
  const { goals } = useGoals();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        All Goals
      </Typography>
      <Grid container spacing={3}>
        {goals.map((goal, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <GoalCard goal={goal} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Goals;