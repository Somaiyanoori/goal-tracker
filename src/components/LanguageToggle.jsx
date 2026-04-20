import { Button, Tooltip } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";

const LanguageToggle = ({ language, setLanguage }) => {
  return (
    <Tooltip title={language === "en" ? "تغییر به فارسی" : "Switch to English"}>
      <Button
        color="inherit"
        startIcon={<TranslateIcon />}
        onClick={() => setLanguage(language === "en" ? "fa" : "en")}
      >
        {language === "en" ? "FA" : "EN"}
      </Button>
    </Tooltip>
  );
};

export default LanguageToggle;
