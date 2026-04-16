import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGoals } from "../context/GoalContext";

const GoalDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { goals } = useGoals();
  const goal = goals.find((g) => g.id === id);

  if (!goal) {
    return (
      <Typography
        sx={{ mt: 4, cursor: "pointer" }}
        onClick={() => navigate("*")}
      >
        {t("goal_not_found")}
      </Typography>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h5">
            {goal.title}
          </Typography>
          <Typography>
            {t("category")}: {t(goal.category.toLowerCase())}
          </Typography>
          <Typography>
            {t("progress")}: {goal.progress}
          </Typography>
          <Typography>
            {t("target")}: {goal.target}
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
};

export default GoalDetails;