import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  Stack,
  MenuItem,
  InputAdornment,
  Chip,
  Tab,
  Tabs,
  Paper,
  useTheme,
  alpha,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGoals } from "../hooks/useGoals";
import GoalCard from "../components/GoalCard";
import { calculateProgress } from "../utils/calculation";

const Goals = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { goals } = useGoals();
  const isDark = theme.palette.mode === "dark";

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const primaryGradient = `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`;
  const primaryShadow = alpha(theme.palette.primary.main, isDark ? 0.35 : 0.3);
  const primaryColor = theme.palette.primary.main;

  const SORT_OPTIONS = [
    { value: "newest", label: t("newest") },
    { value: "oldest", label: t("oldest") },
    { value: "progress_high", label: t("progress_high") },
    { value: "progress_low", label: t("progress_low") },
  ];

  const TABS = ["all", "active", "completed", "paused"];

  const counts = useMemo(
    () => ({
      all: goals.length,
      active: goals.filter((g) => g.status === "active").length,
      completed: goals.filter((g) => g.status === "completed").length,
      paused: goals.filter((g) => g.status === "paused").length,
    }),
    [goals],
  );

  const filteredGoals = useMemo(() => {
    let result = goals;
    if (filter !== "all") result = result.filter((g) => g.status === filter);
    if (search.trim())
      result = result.filter((g) =>
        g.title.toLowerCase().includes(search.toLowerCase()),
      );

    return [...result].sort((a, b) => {
      switch (sort) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "progress_high":
          return (
            calculateProgress(b.progress, b.target) -
            calculateProgress(a.progress, a.target)
          );
        case "progress_low":
          return (
            calculateProgress(a.progress, a.target) -
            calculateProgress(b.progress, b.target)
          );
        default:
          return 0;
      }
    });
  }, [goals, filter, search, sort]);

  const hasActiveFilters = search || filter !== "all";

  const inputSx = {
    borderRadius: "14px",
    backgroundColor: "background.paper",
    boxShadow: `0 2px 10px ${alpha(theme.palette.text.primary, 0.05)}`,
    "& .MuiOutlinedInput-root": { "& fieldset": { border: "none" } },
  };

  return (
    <Container maxWidth="lg">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        mb={4}
        spacing={2}
      >
        <Box>
          <Typography variant="h4">{t("all_goals")}</Typography>
          <Typography variant="body2" color="text.secondary">
            {counts.all} {t("all").toLowerCase()} &middot; {counts.active}{" "}
            {t("active").toLowerCase()} &middot; {counts.completed}{" "}
            {t("completed").toLowerCase()}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          component={Link}
          to="/goals/new"
          size="large"
          sx={{
            px: 3.5,
            borderRadius: "16px",
            background: primaryGradient,
            boxShadow: `0 6px 20px ${primaryShadow}`,
            border: "none",
            "&:hover": { border: "none" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          {t("new_goal")}
        </Button>
      </Stack>

      <Paper
        sx={{
          mb: 3,
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: theme.shadows[isDark ? 5 : 2],
        }}
      >
        <Tabs
          value={filter}
          onChange={(_, v) => setFilter(v)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            px: 2,
            "& .MuiTabs-indicator": {
              background: primaryGradient,
              height: 3,
              borderRadius: 4,
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab
              key={tab}
              value={tab}
              label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <span>{t(tab)}</span>
                  <Chip
                    label={counts[tab]}
                    size="small"
                    sx={{
                      backgroundColor:
                        filter === tab
                          ? alpha(primaryColor, 0.18)
                          : alpha(theme.palette.text.primary, 0.05),
                      color: filter === tab ? primaryColor : "text.secondary",
                      fontWeight: 700,
                    }}
                  />
                </Stack>
              }
              sx={{
                textTransform: "none",
                fontWeight: 600,
                py: 2.5,
                color: filter === tab ? primaryColor : "text.secondary",
              }}
            />
          ))}
        </Tabs>
      </Paper>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        mb={3}
        alignItems="center"
      >
        <TextField
          placeholder={t("search_placeholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon color="action" />
              </InputAdornment>
            ),
            sx: inputSx,
          }}
        />
        <TextField
          select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TuneRoundedIcon color="action" />
              </InputAdornment>
            ),
            sx: inputSx,
          }}
        >
          {SORT_OPTIONS.map((o) => (
            <MenuItem key={o.value} value={o.value}>
              {o.label}
            </MenuItem>
          ))}
        </TextField>
        {hasActiveFilters && (
          <Button
            size="small"
            onClick={() => {
              setSearch("");
              setFilter("all");
            }}
            sx={{ color: "error.main", whiteSpace: "nowrap" }}
          >
            {t("clear_filters")}
          </Button>
        )}
      </Stack>

      {filteredGoals.length > 0 ? (
        <Grid container spacing={3}>
          {filteredGoals.map((goal) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={goal.id}>
              <GoalCard goal={goal} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            py: 12,
            textAlign: "center",
            borderRadius: "24px",
            background: alpha(theme.palette.primary.main, 0.02),
            border: `2px dashed ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Typography variant="h6">
            {goals.length === 0
              ? t("no_goals_title")
              : t("no_match_title", "No Goals Match Your Search")}
          </Typography>
          <Typography color="text.secondary">
            {goals.length === 0
              ? t("no_goals_sub")
              : t(
                  "no_match_sub",
                  "Try using different keywords or clearing filters.",
                )}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Goals;
