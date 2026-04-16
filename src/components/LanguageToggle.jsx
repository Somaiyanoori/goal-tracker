import { Button } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";

const LanguageToggle = ({ language, setLanguage }) => {
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "fa" : "en"));
  };

  return (
    <Button
      color="inherit"
      onClick={toggleLanguage}
      sx={{ textTransform: "none", fontWeight: "bold", ml: 1 }}
    >
      {language === "en" ? "FA" : "EN"}
    </Button>
  );
};

export default LanguageToggle;
