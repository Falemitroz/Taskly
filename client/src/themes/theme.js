// "#3b82f6"

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#388e3c",
      contrastText: "#fff",
    },
    secondary: {
      main: "#215323",
      contrastText: "#fff",
    },
    cancel: {
      main: "#db0000",
      contrastText: "#fff",
    },
    cardButton: {
      primary: "#00000080",
      secondary: "#000000B3",
      newTask: {
        main: "#388e3c21",
        hover: "#388e3c4d",
      },
    },
    dialogIconButton: {
      iconColor: "#fff",
      edit: {
        background: "#388e3c77",
        hover: "#388e3cc5",
      },
      delete: {
        background: "#db00009b",
        hover: "#db0000af",
      },
    },
    text: {
      primary: "#333",
      secondary: "#555",
      contrastText: "#fff",
    },
    border: {
      default: "#333",
      card: "#b8b8b8ff",
    },
    background: {
      default: "#f9f9f9",
      paper: "#fff",
      footer: "#333",
    },
  },
  typography: {
    fontFamily: '"Comic Sans MS", "Arial", sans-serif',
    h1: { fontSize: "3rem", fontWeight: "bold" },
    h2: { fontSize: "2.5rem", fontWeight: "bold" },
    h3: { fontSize: "2rem", fontWeight: "bold" },
    h4: { fontSize: "1.5rem", fontWeight: "bold" },
    h5: { fontSize: "1.25rem", fontWeight: "bold" },
    h6: { fontSize: "1rem", fontWeight: "bold" },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.875rem" },
  },
  spacing: 8,
  shape: {
    borderRadius: 5,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          color: "inherit",
        },
      },
    },
  },
});

export default theme;
