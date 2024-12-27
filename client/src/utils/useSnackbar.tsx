import { createContext, ReactNode, useContext, useState } from "react";
import { OverridableStringUnion } from "@mui/types";
import {
  Alert,
  AlertColor,
  AlertPropsColorOverrides,
  Snackbar
} from "@mui/material";

interface SnackbarContextProps {
  message: string;
  visibility: boolean;
  severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
  open: (
    severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>,
    message: string
  ) => void;
  close: () => void;
}

const SnackbarContext = createContext<SnackbarContextProps>({
  message: "",
  visibility: false,
  severity: "info",
  open: () => {},
  close: () => {}
});

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [severity, setSeverity] =
    useState<OverridableStringUnion<AlertColor, AlertPropsColorOverrides>>(
      "info"
    );

  const open = (
    severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>,
    message: string
  ) => {
    setSeverity(severity);
    setMessage(message);
    setVisibility(true);
  };

  const close = () => {
    setVisibility(false);
  };

  return (
    <SnackbarContext.Provider
      value={{
        message,
        visibility,
        severity,
        open,
        close
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarModal = () => {
  const { message, visibility, severity, close } = useSnackbar();

  return (
    <Snackbar open={visibility} autoHideDuration={6000} onClose={close}>
      <Alert onClose={close} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};
