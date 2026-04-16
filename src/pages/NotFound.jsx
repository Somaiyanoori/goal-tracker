import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        {t("notFound.title")}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {t("notFound.message")}
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        {t("notFound.goHome")}
      </Button>
    </Container>
  );
};

export default NotFound;