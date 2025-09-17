import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./helpers/AuthContext";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./themes/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("Mock mode on? ", process.env.REACT_APP_USE_MOCK);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>
);
