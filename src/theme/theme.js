import { createTheme } from "@mui/material/styles";
import { lightPalette, darkPalette } from "./palette.js";
import typography from "./typography.js";
import components from "./components.js";

const createAppTheme = (mode = "light", direction = "ltr") =>
    createTheme({
        direction,
        palette: mode === "dark" ? darkPalette : lightPalette,
        typography,
        components,
        shape: { borderRadius: 14 },
        spacing: 8,
        transitions: {
            duration: {
                shortest: 150,
                shorter: 200,
                short: 250,
                standard: 300
            }
        }
    });
export default createAppTheme;