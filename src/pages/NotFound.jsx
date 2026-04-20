import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" fontWeight="bold" color="primary">
        404
      </Typography>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {t("not_found_title")}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        {t("not_found_sub")}
      </Typography>
      <Button
        variant="contained"
        startIcon={<HomeRoundedIcon />}
        onClick={() => navigate("/")}
      >
        {t("go_home")}
      </Button>
    </Box>
  );
};

export default NotFound;
