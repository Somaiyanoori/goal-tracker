const components = {
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 18,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.08)"
        }
      }
    }
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        padding: "8px 20px",
        textTransform: "none"
      },
      containedPrimary: {
        boxShadow: "none"
      }
    }
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 14,
        transition: "all 0.25s ease"
      }
    }
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        height: 8,
        borderRadius: 6
      },
      bar: {
        borderRadius: 6
      }
    }
  },
  MuiTextField: {
    defaultProps: {
      size: "small",
      variant: "outlined"
    }
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: "none",
        borderBottom: "1px solid #eee"
      }
    }
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        paddingTop: "24px",
        paddingBottom: "24px"
      }
    }
  }
};

export default components;