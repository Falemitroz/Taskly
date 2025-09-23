import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./helpers/AuthContext";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./themes/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
// console.log("Mock mode on? ", process.env.REACT_APP_USE_MOCK);

if (process.env.WEB_APP_USE_MOCK === "true") {
  const { worker } = require("./mocks/browser");
  worker.start({
    serviceWorker: {
      url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`,
    },
  });
}

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>
);
