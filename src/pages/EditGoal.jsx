import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Stack,
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";
import { useGoals } from "../context/GoalContext";
import { CATEGORIES, GOAL_TYPES } from "../utils/constants";

const EditGoal = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { goals, updateGoal } = useGoals();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    type: "",
    target: "",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const goalToEdit = goals.find((g) => g.id === id);
    if (goalToEdit) {
      setFormData({
        title: goalToEdit.title,
        category: goalToEdit.category,
        type: goalToEdit.type,
        target: goalToEdit.target,
        startDate: goalToEdit.startDate.split("T")[0],
        endDate: goalToEdit.endDate
          ? goalToEdit.endDate.split("T")[0]
          : "",
      });
      setLoading(false);
    } else {
      setTimeout(() => navigate("/404"), 1000);
    }
  }, [id, goals, navigate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (
      !formData.title ||
      !formData.category ||
      !formData.type ||
      !formData.target
    ) {
      setError(t("error_empty"));
      return;
    }
    const updatedGoalData = {
      title: formData.title,
      category: formData.category,
      type: formData.type,
      target: Number(formData.target),
      startDate: formData.startDate,
      endDate: formData.endDate || null,
    };
    updateGoal(id, updatedGoalData);
    navigate(`/goals/${id}`);
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
        <Typography>{t("loading_goal_data")}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3 }}>
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          fontWeight="bold"
          color="primary"
        >
          {t("edit_goal")}
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label={t("goal_title")}
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              sx={{ width: "100%" }}
            >
              <TextField
                select
                fullWidth
                label={t("category")}
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {t(cat.toLowerCase())}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                fullWidth
                label={t("goal_type")}
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                {GOAL_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {t(type.toLowerCase())}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <TextField
              fullWidth
              type="number"
              label={t("target_number")}
              name="target"
              value={formData.target}
              onChange={handleChange}
              inputProps={{ min: 1 }}
            />
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              sx={{ width: "100%" }}
            >
              <TextField
                fullWidth
                type="date"
                label={t("start_date")}
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                type="date"
                label={t("end_date")}
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              sx={{ mt: 2 }}
            >
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate(-1)}
                sx={{ px: 3 }}
              >
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ px: 4 }}
              >
                {t("save")}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditGoal;