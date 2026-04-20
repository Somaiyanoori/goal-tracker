import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  useTheme,
  alpha,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useGoals } from "../hooks/useGoals";
import GoalForm from "../components/GoalForm";

const toInputDate = (date) =>
  !date ? "" : new Date(date).toISOString().split("T")[0];

const EditGoal = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const { id } = useParams();
  const { goals, updateGoal } = useGoals();
  const [loading, setLoading] = useState(true);
  const goal = useMemo(() => goals.find((g) => g.id === id), [id, goals]);
  const initialData = useMemo(() => {
    if (!goal) return null;
    return {
      ...goal,
      startDate: toInputDate(goal.startDate),
      endDate: toInputDate(goal.endDate),
    };
  }, [goal]);

  useEffect(() => {
    if (goal) {
      setLoading(false);
    } else {
      const timeoutId = setTimeout(() => {
        if (!goals.find((g) => g.id === id)) {
          navigate("/404", { replace: true });
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [id, goal, goals, navigate]);

  const handleSubmit = (data) => {
    updateGoal(id, {
      ...data,
      target: Number(data.target),
      endDate: data.endDate || null,
    });
    navigate(`/goals/${id}`, { replace: true });
  };

  const editGradient = `linear-gradient(135deg, ${theme.palette.info.dark}, ${theme.palette.info.main})`;

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress size={48} />
      </Container>
    );
  }

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
        <Box sx={{ height: 6, background: editGradient }} />
        <Box sx={{ p: { xs: 3, md: 4 } }}>
          <Box
            sx={{
              mb: 3.5,
              p: 2.5,
              borderRadius: "18px",
              backgroundColor: alpha(theme.palette.info.main, 0.08),
            }}
          >
            <Typography
              variant="h5"
              sx={{
                background: editGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t("edit_goal")}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              {t("update_goal_subtitle")}
            </Typography>
          </Box>
          {initialData && (
            <GoalForm
              initialData={initialData}
              onSubmit={handleSubmit}
              onCancel={() => navigate(`/goals/${id}`)}
              isEdit
            />
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default EditGoal;
