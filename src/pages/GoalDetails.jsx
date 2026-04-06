import { useParams } from "react-router-dom";
import { Container, Typography, Paper, Stack } from "@mui/material";
import { useGoals } from "../context/GoalContext";

const GoalDetails = () => {
  const { id } = useParams();
  const { goals } = useGoals();
  const goal = goals[id];

  if (!goal) {
    return <Typography>Goal not found</Typography>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h5">{goal.title}</Typography>
          <Typography>Category: {goal.category}</Typography>
          <Typography>Progress: {goal.progress}</Typography>
          <Typography>Target: {goal.target}</Typography>
        </Stack>
      </Paper>
    </Container>
  );
};

export default GoalDetails;