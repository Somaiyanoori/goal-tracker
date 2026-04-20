import { IconButton, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ThemeToggle = ({ mode, setMode }) => {
  return (
    <Tooltip
      title={mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <IconButton
        onClick={() => setMode(mode === "light" ? "dark" : "light")}
        color="inherit"
      >
        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
