import { useMediaQuery, useTheme } from "@mui/material";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import { useLocation } from "react-router";
import { useCustomParams } from "./useCustomParams";

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
  const [width, setWidth] = useState("33vw");
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(
    location.pathname.includes("/note/") ? true : !isMobile
  );
  const { getParam } = useCustomParams();

  useEffect(() => {
    if (location.pathname.includes("dashboard/note")) {
      setOpen(location.pathname.includes("dashboard/note"));
    }
  }, [getParam("n")]);

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
