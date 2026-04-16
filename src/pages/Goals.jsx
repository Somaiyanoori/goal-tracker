import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Tabs,
  Tab,
  Paper,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGoals } from "../context/GoalContext";
import GoalCard from "../components/GoalCard";

const Goals = () => {
  const { t } = useTranslation();
  const { goals } = useGoals();
  const [filter, setFilter] = useState("all");
  const handleChange = (e, newValue) => {
    setFilter(newValue);
  };
  const filteredGoals = goals.filter(
    (g) => filter === "all" || g.status === filter
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {t("all_goals_title")}
      </Typography>
      <Tabs value={filter} onChange={handleChange} sx={{ mb: 3 }}>
        <Tab label={t("all")} value="all" />
        <Tab label={t("active")} value="active" />
        <Tab label={t("completed")} value="completed" />
        <Tab label={t("paused")} value="paused" />
      </Tabs>
      {filteredGoals.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }} variant="outlined">
          <Typography variant="h6">
            {t("no_goals_found")}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {t("lets_create_one")}
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/goals/new"
          >
            {t("create_goal")}
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredGoals.map((goal, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <GoalCard goal={goal} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Goals;