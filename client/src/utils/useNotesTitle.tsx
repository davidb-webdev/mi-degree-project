import {
  createContext,
  ReactNode,
  useContext,
  // useEffect,
  useState
} from "react";

interface NotesTitleContextInterface {
  notesTitle: string;
  setNotesTitle: (_value: string) => void;
}

const NotesTitleContext = createContext<NotesTitleContextInterface>({
  notesTitle: "Notes",
  setNotesTitle: () => {}
});

export const NotesTitleProvider = ({ children }: { children: ReactNode }) => {
  const [notesTitle, setNotesTitle] = useState("Notes");

  return (
    <NotesTitleContext.Provider value={{ notesTitle, setNotesTitle }}>
      {children}
    </NotesTitleContext.Provider>
  );
};

export const useNotesTitle = () => useContext(NotesTitleContext);
