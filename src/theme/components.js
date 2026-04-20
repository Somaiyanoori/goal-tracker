const components = (palette) => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": { width: 6 },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: 10,
          background:
            palette.mode === "dark"
              ? "rgba(255,255,255,0.2)"
              : "rgba(0,0,0,0.2)",
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
        fontWeight: 700,
        letterSpacing: 0.2,
        boxShadow: "none",
        transition: "all 0.25s ease",
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: "outlined",
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: "none",
        border: "none",
        backdropFilter: "blur(12px)",
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        border: "none",
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: {
        "& .MuiTabs-indicator": {
          borderRadius: 4,
          height: 3,
        },
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: "none",
        fontWeight: 600,
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "scale(1.08)",
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 16,
        backgroundImage: "none",
      },
    },
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        paddingTop: "28px",
        paddingBottom: "36px",
      },
    },
  },
});

export default components;
