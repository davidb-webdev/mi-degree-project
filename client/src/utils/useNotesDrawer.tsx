import { useMediaQuery, useTheme } from "@mui/material";
import { createContext, ReactNode, useContext, useState } from "react";
import { useLocation } from "react-router";

interface NotesDrawerContextProps {
  open: boolean;
  toggle: () => void;
  width: string;
  setWidth: (_value: string) => void;
}

const NotesDrawerContext = createContext<NotesDrawerContextProps>({
  open: false,
  toggle: () => {},
  width: "33vw",
  setWidth: () => {}
});

export const NotesDrawerProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(
    location.pathname.includes("/note/") ? true : !isMobile
  );
  const [width, setWidth] = useState("33vw");

  const toggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <NotesDrawerContext.Provider
      value={{
        open,
        toggle,
        width,
        setWidth
      }}
    >
      {children}
    </NotesDrawerContext.Provider>
  );
};

export const useNotesDrawer = () => useContext(NotesDrawerContext);
