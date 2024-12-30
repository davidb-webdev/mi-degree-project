import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import Router from "./Router";
import "./index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import fireInspectTheme from "./utils/theme";
import { NotesDrawerProvider } from "./utils/useNotesDrawer";
import "./utils/i18n";
import { SnackbarProvider } from "./utils/useSnackbar";
import { AuthProvider } from "./utils/useAuth";
import { CustomParamsProvider } from "./utils/useCustomParams";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={fireInspectTheme}>
      <BrowserRouter>
        <CustomParamsProvider>
          <SnackbarProvider>
            <AuthProvider>
              <NotesDrawerProvider>
                <CssBaseline />
                <Router />
              </NotesDrawerProvider>
            </AuthProvider>
          </SnackbarProvider>
        </CustomParamsProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
