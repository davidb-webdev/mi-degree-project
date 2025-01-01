import { createTheme } from "@mui/material/styles";

const fireInspectTheme = createTheme({
  palette: {
    primary: {
      light: "#fff",
      main: "#d47e2e",
      dark: "#bf5d27",
      contrastText: "#000"
    },
    secondary: {
      light: "#e4a446",
      main: "#238b21",
      dark: "#bf5d27",
      contrastText: "#fff"
    }
  }
});

export default fireInspectTheme;
