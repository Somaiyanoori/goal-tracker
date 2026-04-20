import { lightPalette, darkPalette } from "../theme/palette";

export const CATEGORIES = ["Health", "Study", "Work", "Personal", "Finance"];
export const GOAL_TYPES = ["Daily", "Count", "Time"];
export const STATUS_CONFIG_LIGHT = {
  active: {
    label: "active",
    color: lightPalette.success.main,
    bg: lightPalette.success.light,
  },
  paused: {
    label: "paused",
    color: lightPalette.warning.main,
    bg: lightPalette.warning.light,
  },
  completed: {
    label: "completed",
    color: lightPalette.info.main,
    bg: lightPalette.info.light,
  },
};

export const STATUS_CONFIG_DARK = {
  active: {
    label: "active",
    color: darkPalette.success.main,
    bg: "rgba(129,199,132,0.12)",
  },
  paused: {
    label: "paused",
    color: darkPalette.warning.main,
    bg: "rgba(255,183,77,0.12)",
  },
  completed: {
    label: "completed",
    color: darkPalette.info.main,
    bg: "rgba(144,202,249,0.12)",
  },
};
