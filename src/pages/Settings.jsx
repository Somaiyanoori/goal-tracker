import {
  Container,
  Typography,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
} from "@mui/material";

const Settings = ({ mode, setMode, language, setLanguage }) => {
  const handleThemeChange = (_, newMode) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };
  
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Settings
        </Typography>

        <Stack spacing={4} mt={2}>
          <Stack spacing={2}>
            <Typography variant="h6">Theme</Typography>
            <ToggleButtonGroup
              value={mode}
              exclusive
              onChange={handleThemeChange}
              fullWidth
            >
              <ToggleButton value="light">Light</ToggleButton>
              <ToggleButton value="dark">Dark</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <Divider />

          <Stack spacing={2}>
            <Typography variant="h6">Language</Typography>
            <FormControl fullWidth>
              <InputLabel>Language</InputLabel>
              <Select
                value={language}
                label="Language"
                onChange={handleLanguageChange}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="fa">Persian</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Settings;