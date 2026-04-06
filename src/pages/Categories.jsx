import { Container, Typography, Stack, Chip } from "@mui/material";
import { CATEGORIES } from "../utils/constants";

const Categories = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Categories
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        {CATEGORIES.map((cat) => (
          <Chip key={cat} label={cat} color="primary" />
        ))}
      </Stack>
    </Container>
  );
};

export default Categories;