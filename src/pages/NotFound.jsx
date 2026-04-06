import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" gutterBottom>
        Page Not Found
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </Container>
  );
};

export default NotFound;