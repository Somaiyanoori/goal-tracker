import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  useTheme,
  alpha,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useGoals } from "../hooks/useGoals";
import GoalForm from "../components/GoalForm";

const CreateGoal = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const { addGoal } = useGoals();

  const handleSubmit = (data) => {
    addGoal({
      ...data,
      target: Number(data.target),
      endDate: data.endDate || null,
    });
    navigate("/goals");
  };

  const primaryGradient = `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`;

  return (
    <Container maxWidth="sm">
      <Button
        startIcon={<ArrowBackRoundedIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2.5, color: "text.secondary" }}
      >
        {t("back")}
      </Button>
      <Paper
        sx={{
          borderRadius: "28px",
          overflow: "hidden",
          boxShadow: theme.shadows[5],
        }}
      >
        <Box sx={{ height: 6, background: primaryGradient }} />
        <Box sx={{ p: { xs: 3, md: 4 } }}>
          <Box
            sx={{
              mb: 3.5,
              p: 2.5,
              borderRadius: "18px",
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
            }}
          >
            <Typography
              variant="h5"
              sx={{
                background: primaryGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t("create_goal")}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              {t("set_goal_subtitle")}
            </Typography>
          </Box>
          <GoalForm onSubmit={handleSubmit} onCancel={() => navigate(-1)} />
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateGoal;
