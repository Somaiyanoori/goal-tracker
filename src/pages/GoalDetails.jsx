import {
  Container,
  Typography,
  Paper,
  Stack,
  Box,
  LinearProgress,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Grid,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGoals } from "../hooks/useGoals";
import { calculateProgress } from "../utils/calculation";

const formatDate = (d, t) =>
  d
    ? new Date(d).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : t("no_deadline");
const formatLogDate = (d) =>
  new Date(d).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const InfoRow = ({ label, value }) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{ py: 1.5 }}
  >
    <Typography variant="body2" color="text.secondary" fontWeight={600}>
      {label}
    </Typography>
    <Typography variant="body1" fontWeight="bold">
      {value}
    </Typography>
  </Stack>
);

const GoalDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { goals, logProgress, togglePause, markComplete } = useGoals();
  const goal = goals.find((g) => g.id === id);

  if (!goal) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          {t("goal_not_found")}
        </Typography>
        <Button variant="contained" onClick={() => navigate("/goals")}>
          {t("back_to_goals")}
        </Button>
      </Container>
    );
  }

  const primaryGradient = `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`;
  const progressPct = calculateProgress(goal.progress, goal.target);
  const isCompleted = goal.status === "completed";
  const isPaused = goal.status === "paused";
  const unitLabel =
    goal.type === "Time"
      ? t("minutes")
      : goal.type === "Daily"
        ? t("days")
        : t("units");

  return (
    <Container maxWidth="lg">
      <Button
        startIcon={<ArrowBackRoundedIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3, color: "text.secondary" }}
      >
        {t("back")}
      </Button>
      <Paper
        sx={{
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: theme.shadows[theme.palette.mode === "dark" ? 8 : 4],
        }}
      >
        <Box
          sx={{
            p: 4,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${theme.palette.background.paper} 70%)`,
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Box>
              <Chip
                label={t(goal.category.toLowerCase())}
                sx={{
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: "primary.dark",
                  fontWeight: 700,
                  mb: 1.5,
                }}
              />
              <Typography variant="h4" sx={{ color: "text.primary" }}>
                {goal.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {t(goal.type.toLowerCase())} Goal
              </Typography>
            </Box>
            <Chip
              label={t(goal.status)}
              variant="outlined"
              sx={{ fontWeight: "bold" }}
              color={isCompleted ? "success" : isPaused ? "warning" : "primary"}
            />
          </Stack>
        </Box>
        <Divider />
        <Grid container>
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              p: 4,
              borderRight: { md: `1px solid ${theme.palette.divider}` },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Details
            </Typography>
            <Stack divider={<Divider flexItem />}>
              <InfoRow
                label={t("target")}
                value={`${goal.target} ${unitLabel}`}
              />
              <InfoRow
                label={t("start_date")}
                value={formatDate(goal.startDate, t)}
              />
              <InfoRow
                label={t("end_date")}
                value={formatDate(goal.endDate, t)}
              />
            </Stack>
            {goal.notes && (
              <Box mt={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Notes
                </Typography>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    mt: 1,
                    backgroundColor: alpha(theme.palette.text.primary, 0.03),
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                    {goal.notes}
                  </Typography>
                </Paper>
              </Box>
            )}
            <Divider sx={{ my: 4 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              Actions
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1.5}>
              {!isCompleted && (
                <Button
                  variant="contained"
                  startIcon={<AddRoundedIcon />}
                  onClick={() => logProgress(goal.id, 1)}
                  disabled={isPaused}
                >
                  {t("log_progress")}
                </Button>
              )}
              {!isCompleted && (
                <Button
                  variant="outlined"
                  color="success"
                  startIcon={<CheckCircleRoundedIcon />}
                  onClick={() => markComplete(goal.id)}
                  disabled={isPaused}
                >
                  {t("mark_complete")}
                </Button>
              )}
              <Button
                variant="outlined"
                color="info"
                startIcon={<EditRoundedIcon />}
                component={Link}
                to={`/goals/${goal.id}/edit`}
              >
                {t("edit_goal")}
              </Button>
              {!isCompleted && (
                <Button
                  variant="outlined"
                  color="warning"
                  startIcon={
                    isPaused ? <PlayArrowRoundedIcon /> : <PauseRoundedIcon />
                  }
                  onClick={() => togglePause(goal.id)}
                >
                  {isPaused ? t("resume_goal") : t("pause_goal")}
                </Button>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} md={5} sx={{ p: 4 }}>
            <Box mb={4}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
                mb={1}
              >
                <Typography variant="h6">{t("progress")}</Typography>
                <Typography variant="h5" sx={{ color: "primary.main" }}>
                  {progressPct}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={progressPct}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  "& .MuiLinearProgress-bar": { background: primaryGradient },
                }}
              />
              <Typography variant="caption" color="text.secondary" mt={1}>
                {goal.progress} / {goal.target} {unitLabel}
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h6" gutterBottom>
              {t("progress_history")}
            </Typography>
            {goal.logs?.length > 0 ? (
              <List dense sx={{ maxHeight: 300, overflowY: "auto", pr: 1 }}>
                {[...goal.logs].reverse().map((log) => (
                  <ListItem
                    key={log.id}
                    disableGutters
                    sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="body2" fontWeight="bold">
                          +{log.amount} {unitLabel}
                        </Typography>
                      }
                      secondary={formatLogDate(log.date)}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                {t("no_logs")}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default GoalDetails;
