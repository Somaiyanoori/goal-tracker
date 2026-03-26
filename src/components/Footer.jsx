import { Box, Typography } from "@mui/material";
export default function Footer() {
  return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Goal Tracker App
      </Typography>
    </Box>
  );
}