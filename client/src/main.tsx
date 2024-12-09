import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import Router from "./Router";
import "./index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import fireInspectTheme from "./Theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={fireInspectTheme}>
      <BrowserRouter>
        <CssBaseline />
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
