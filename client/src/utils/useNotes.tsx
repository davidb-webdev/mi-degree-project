import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import useAxios from "./useAxios";
import { useSnackbar } from "./useSnackbar";
import { WithId } from "../models/General";
import { Note } from "../models/Note";
import { useCustomParams } from "./useCustomParams";

interface NotesContextProps {
  notes: WithId<Note>[];
  refreshNotes: () => void;
}

const NotesContext = createContext<NotesContextProps>({
  notes: [],
  refreshNotes: () => {}
});

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<WithId<Note>[]>([]);
  const [reloadKey, setReloadKey] = useState(0);
  const apiClient = useAxios();
  const snackbar = useSnackbar();
  const { getParam } = useCustomParams();

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await apiClient.get(`/api/notes/${getParam("f")}`);
        setNotes(response.data);
      } catch (error) {
        snackbar.close();
        setNotes([]);
      }
    };
    getNotes();
  }, [getParam("p"), getParam("f"), reloadKey]);

  const refreshNotes = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return (
    <NotesContext.Provider value={{ notes, refreshNotes }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
