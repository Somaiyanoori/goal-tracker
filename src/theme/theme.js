import { createTheme } from "@mui/material/styles";
import { lightPalette, darkPalette } from "./palette.js";
import typography from "./typography.js";
import components from "./components.js";

const createAppTheme = (mode = "light", direction = "ltr") =>
  createTheme({
    direction,
    palette: mode === "dark" ? darkPalette : lightPalette,
    typography,
    components: components(mode === "dark" ? darkPalette : lightPalette),
    shape: {
      borderRadius: 12,
    },
    spacing: 8,
    layout: {
      drawerWidth: 268,
    },
  });

export default createAppTheme;
