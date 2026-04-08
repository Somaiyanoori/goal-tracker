import {
  Card,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
  Stack,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGoals } from "../context/GoalContext";
import { Link } from "react-router-dom";

const GoalCard = ({ goal }) => {
  const { logProgress, deleteGoal } = useGoals();
  const progressPercentage = Math.min(100,Math.round((goal.progress / goal.target) * 100));

  return (
    <Card
      elevation={3}
      sx={{ borderRadius: 3, transition: "0.3s", "&:hover": { boxShadow: 6 }, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" } }
    >
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" fontWeight="bold">
              {goal.title}
            </Typography>
            <Chip label={goal.category} color="primary" size="small" />
          </Stack>
          <Box>
            <LinearProgress
              variant="determinate"
              value={progressPercentage}
              sx={{ height: 8, borderRadius: 5 }}
            />
            <Typography variant="body2" mt={1}>
              {goal.progress} / {goal.target}
            </Typography>
          </Box>
          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            <IconButton
              color="primary"
              onClick={() => logProgress(goal.id)}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              color="warning"
              component={Link}
              to={`/goals/${goal.id}/edit`}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => deleteGoal(goal.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default GoalCard;