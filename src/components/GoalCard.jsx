import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Stack,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
  useTheme,
  TextField,
  DialogContentText,
  alpha,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { useGoals } from "../hooks/useGoals";
import { STATUS_CONFIG_LIGHT, STATUS_CONFIG_DARK } from "../utils/constants";
import { calculateProgress } from "../utils/calculation";

const GoalCard = ({ goal }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { logProgress, deleteGoal, togglePause, markComplete } = useGoals();

  const [openDelete, setOpenDelete] = useState(false);
  const [openLog, setOpenLog] = useState(false);
  const [logAmount, setLogAmount] = useState(1);

  const isDark = theme.palette.mode === "dark";
  const STATUS = isDark ? STATUS_CONFIG_DARK : STATUS_CONFIG_LIGHT;
  const statusCfg = STATUS[goal.status] || STATUS.active;
  const progressPct = calculateProgress(goal.progress, goal.target);
  const isCompleted = goal.status === "completed";
  const isPaused = goal.status === "paused";

  const unitLabel =
    goal.type === "Time"
      ? t("minutes")
      : goal.type === "Daily"
        ? t("days")
        : t("units");

  const primaryGradient = `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`;

  const handleLogSubmit = () => {
    if (Number(logAmount) > 0) {
      logProgress(goal.id, Number(logAmount));
      setLogAmount(1);
      setOpenLog(false);
    }
  };

  const handleQuickLog = () => {
    if (goal.type === "Daily") logProgress(goal.id, 1);
    else setOpenLog(true);
  };

  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          boxShadow: theme.shadows[isDark ? 8 : 4],
          opacity: isPaused ? 0.7 : 1,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: theme.shadows[isDark ? 12 : 6],
          },
        }}
      >
        <Box sx={{ height: 6, background: primaryGradient }} />
        <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
          <Stack spacing={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={1.5}
            >
              <Typography
                variant="h6"
                onClick={() => navigate(`/goals/${goal.id}`)}
                sx={{ cursor: "pointer", "&:hover": { color: "primary.dark" } }}
              >
                {goal.title}
              </Typography>
              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "8px",
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="caption"
                  fontWeight={700}
                  sx={{ color: "primary.dark", whiteSpace: "nowrap" }}
                >
                  {t(goal.category.toLowerCase())}
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: statusCfg.color,
                  boxShadow: `0 0 6px ${alpha(statusCfg.color, 0.6)}`,
                }}
              />
              <Typography
                variant="caption"
                fontWeight={700}
                sx={{ color: statusCfg.color, textTransform: "capitalize" }}
              >
                {t(statusCfg.label)}
              </Typography>
            </Stack>

            <Box>
              <Stack direction="row" justifyContent="space-between" mb={1}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={600}
                >
                  {goal.progress} / {goal.target} {unitLabel}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={800}
                  sx={{ color: "primary.main" }}
                >
                  {progressPct}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={progressPct}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  "& .MuiLinearProgress-bar": {
                    background: primaryGradient,
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
          </Stack>
        </CardContent>

        <Stack
          direction="row"
          justifyContent={{ xs: "center", sm: "flex-end" }}
          flexWrap="wrap"
          gap={1}
          sx={{ p: 1.5, borderTop: `1px solid ${theme.palette.divider}` }}
        >
          <Tooltip title={t("view_details")}>
            <IconButton
              size="small"
              component={Link}
              to={`/goals/${goal.id}`}
              sx={{
                backgroundColor: alpha(theme.palette.info.main, 0.1),
                color: "info.dark",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.info.main, 0.2),
                },
              }}
            >
              <VisibilityRoundedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>

          {!isCompleted && (
            <>
              <Tooltip title={t("log_progress")}>
                <span>
                  <IconButton
                    size="small"
                    onClick={handleQuickLog}
                    disabled={isPaused}
                    sx={{
                      backgroundColor: alpha(theme.palette.success.main, 0.1),
                      color: "success.dark",
                      "&:hover": {
                        backgroundColor: alpha(theme.palette.success.main, 0.2),
                      },
                      "&.Mui-disabled": { opacity: 0.4 },
                    }}
                  >
                    <AddRoundedIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title={t("mark_complete")}>
                <span>
                  <IconButton
                    size="small"
                    onClick={() => markComplete(goal.id)}
                    disabled={isPaused}
                    sx={{
                      backgroundColor: alpha(theme.palette.success.main, 0.1),
                      color: "success.dark",
                      "&:hover": {
                        backgroundColor: alpha(theme.palette.success.main, 0.2),
                      },
                      "&.Mui-disabled": { opacity: 0.4 },
                    }}
                  >
                    <CheckCircleRoundedIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title={t("edit")}>
                <IconButton
                  size="small"
                  component={Link}
                  to={`/goals/${goal.id}/edit`}
                  sx={{
                    backgroundColor: alpha(theme.palette.warning.main, 0.1),
                    color: "warning.dark",
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.warning.main, 0.2),
                    },
                  }}
                >
                  <EditRoundedIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title={isPaused ? t("resume_goal") : t("pause_goal")}>
                <IconButton
                  size="small"
                  onClick={() => togglePause(goal.id)}
                  sx={{
                    backgroundColor: alpha(
                      theme.palette.secondary.main,
                      isPaused ? 0.2 : 0.1,
                    ),
                    color: "secondary.dark",
                    "&:hover": {
                      backgroundColor: alpha(
                        theme.palette.secondary.main,
                        isPaused ? 0.3 : 0.2,
                      ),
                    },
                  }}
                >
                  {isPaused ? (
                    <PlayArrowRoundedIcon sx={{ fontSize: 18 }} />
                  ) : (
                    <PauseRoundedIcon sx={{ fontSize: 18 }} />
                  )}
                </IconButton>
              </Tooltip>
            </>
          )}

          <Tooltip title={t("delete")}>
            <IconButton
              size="small"
              onClick={() => setOpenDelete(true)}
              sx={{
                backgroundColor: alpha(theme.palette.error.main, 0.1),
                color: "error.dark",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.error.main, 0.2),
                },
              }}
            >
              <DeleteRoundedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Card>

      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        maxWidth="xs"
      >
        <DialogTitle fontWeight={700}>{t("delete_confirm_title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("delete_confirm_sub")}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpenDelete(false)}>{t("cancel")}</Button>
          <Button
            onClick={() => {
              deleteGoal(goal.id);
              setOpenDelete(false);
            }}
            color="error"
            variant="contained"
          >
            {t("yes_delete")}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openLog}
        onClose={() => setOpenLog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle fontWeight={700}>{t("log_progress")}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            type="number"
            label={`${t("amount")} (${unitLabel})`}
            value={logAmount}
            onChange={(e) => setLogAmount(e.target.value)}
            inputProps={{ min: 1 }}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpenLog(false)}>{t("cancel")}</Button>
          <Button onClick={handleLogSubmit} variant="contained">
            {t("confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GoalCard;
