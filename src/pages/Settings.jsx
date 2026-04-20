import {
  Container,
  Typography,
  Paper,
  Stack,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  alpha,
  Divider,
} from "@mui/material";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { useTranslation } from "react-i18next";

const SectionHeader = ({ icon, title, subtitle, gradient, shadowColor }) => (
  <Stack direction="row" alignItems="center" spacing={2} mb={3}>
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: "16px",
        background: gradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        boxShadow: `0 4px 14px ${alpha(shadowColor, 0.35)}`,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="h6" fontWeight={700}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  </Stack>
);

const Settings = ({ mode, setMode, language, setLanguage }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const primaryGradient = `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`;
  const secondaryGradient = `linear-gradient(135deg, ${theme.palette.secondary.dark}, ${theme.palette.secondary.main})`;
  const infoGradient = `linear-gradient(135deg, ${theme.palette.info.dark}, ${theme.palette.info.main})`;

  const selectedBg = alpha(theme.palette.primary.main, 0.12);
  const hoverBg = alpha(theme.palette.text.primary, 0.04);

  return (
    <Container maxWidth="sm">
      <Box mb={4}>
        <Typography variant="h4" fontWeight={800}>
          {t("settings")}
        </Typography>
        <Typography variant="body1" color="text.secondary" mt={0.5}>
          Customize your experience
        </Typography>
      </Box>

      <Stack spacing={3}>
        <Paper sx={{ p: { xs: 3, md: 3.5 }, borderRadius: "24px" }}>
          <SectionHeader
            icon={<LightModeRoundedIcon />}
            title={t("theme")}
            subtitle="Choose your preferred color scheme"
            gradient={primaryGradient}
            shadowColor={theme.palette.primary.main}
          />
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(_, v) => {
              if (v) setMode(v);
            }}
            fullWidth
            sx={{
              gap: 1.5,
              "& .MuiToggleButtonGroup-grouped": {
                border: "none !important",
                borderRadius: "14px !important",
              },
            }}
          >
            {["light", "dark"].map((value) => (
              <ToggleButton
                key={value}
                value={value}
                sx={{
                  py: 1.5,
                  fontWeight: 700,
                  backgroundColor: mode === value ? selectedBg : "transparent",
                  color: mode === value ? "primary.main" : "text.secondary",
                  border:
                    mode === value
                      ? `2px solid ${alpha(theme.palette.primary.main, 0.3)} !important`
                      : "2px solid transparent !important",
                  transition: "all 0.2s ease",
                  "&.Mui-selected, &:hover": {
                    backgroundColor: mode === value ? selectedBg : hoverBg,
                  },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  {value === "light" ? (
                    <LightModeRoundedIcon fontSize="small" />
                  ) : (
                    <DarkModeRoundedIcon fontSize="small" />
                  )}
                  <span>{t(value)}</span>
                </Stack>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Paper>

        <Paper sx={{ p: { xs: 3, md: 3.5 }, borderRadius: "24px" }}>
          <SectionHeader
            icon={<TranslateRoundedIcon />}
            title={t("language")}
            subtitle={t("language_direction")}
            gradient={secondaryGradient}
            shadowColor={theme.palette.secondary.main}
          />
          <FormControl fullWidth>
            <InputLabel>{t("language")}</InputLabel>
            <Select
              value={language}
              label={t("language")}
              onChange={(e) => setLanguage(e.target.value)}
              sx={{ borderRadius: "14px" }}
            >
              <MenuItem value="en">
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "8px",
                      backgroundColor: alpha(theme.palette.info.main, 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      fontWeight={800}
                      sx={{ color: "info.dark" }}
                    >
                      EN
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight={700}>
                      English
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {t("ltr_label")}
                    </Typography>
                  </Box>
                </Stack>
              </MenuItem>
              <MenuItem value="fa">
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "8px",
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      fontWeight={800}
                      sx={{ color: "primary.dark" }}
                    >
                      FA
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight={700}>
                      Persian — فارسی
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {t("rtl_label")}
                    </Typography>
                  </Box>
                </Stack>
              </MenuItem>
            </Select>
          </FormControl>
        </Paper>

        <Paper sx={{ p: { xs: 3, md: 3.5 }, borderRadius: "24px" }}>
          <SectionHeader
            icon={<InfoRoundedIcon />}
            title={t("about_title")}
            gradient={infoGradient}
            shadowColor={theme.palette.info.main}
          />
          <Box
            sx={{
              p: 2.5,
              borderRadius: "18px",
              background: alpha(
                theme.palette.background.default,
                isDark ? 1 : 0.5,
              ),
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Stack spacing={1.5}>
              {[
                { label: "Version", value: "1.0.0" },
                { label: "Storage", value: "Local Browser Storage" },
                { label: "Languages", value: "English + Persian (FA)" },
              ].map((item) => (
                <Stack
                  key={item.label}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight={600}
                  >
                    {item.label}
                  </Typography>
                  <Typography variant="body2" fontWeight={700}>
                    {item.value}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography variant="caption" color="text.secondary">
              {t("about_sub")}
            </Typography>
          </Box>
        </Paper>
      </Stack>
    </Container>
  );
};

export default Settings;
