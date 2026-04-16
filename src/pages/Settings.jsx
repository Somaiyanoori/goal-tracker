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
import { useTranslation } from "react-i18next";

const Settings = ({ mode, setMode, language, setLanguage }) => {
  const { t } = useTranslation();
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
          {t("settings")}
        </Typography>
        <Stack spacing={4} mt={2}>
          <Stack spacing={2}>
            <Typography variant="h6">{t("theme")}</Typography>
            <ToggleButtonGroup
              value={mode}
              exclusive
              onChange={handleThemeChange}
              fullWidth
            >
              <ToggleButton value="light">
                {t("light")}
              </ToggleButton>
              <ToggleButton value="dark">
                {t("dark")}
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <Divider />
          <Stack spacing={2}>
            <Typography variant="h6">{t("language")}</Typography>
            <FormControl fullWidth>
              <InputLabel>{t("language")}</InputLabel>
              <Select
                value={language}
                label={t("language")}
                onChange={handleLanguageChange}
              >
                <MenuItem value="en">
                  {t("english")}
                </MenuItem>
                <MenuItem value="fa">
                  {t("persian")}
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Settings;