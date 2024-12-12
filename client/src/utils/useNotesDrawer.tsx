import { createContext, ReactNode, useContext, useState } from "react";

interface NotesDrawerContextInterface {
  open: boolean;
  toggle: () => void;
  width: string;
  setWidth: (_value: string) => void;
}

const NotesDrawerContext = createContext<NotesDrawerContextInterface>({
  open: false,
  toggle: () => {},
  width: "33vw",
  setWidth: () => {}
});

export const NotesDrawerProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
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
