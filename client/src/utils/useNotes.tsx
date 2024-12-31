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
}

const NotesContext = createContext<NotesContextProps>({
  notes: []
});

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<WithId<Note>[]>([]);
  const apiClient = useAxios();
  const snackbar = useSnackbar();
  const { getParam } = useCustomParams();

  useEffect(() => {
    const getNotes = async () => {
      if (getParam("p") && getParam("f")) {
        try {
          const response = await apiClient.get<WithId<Note>[]>(
            `/api/notes/${getParam("f")}`
          );
          setNotes(response.data);
        } catch (error) {
          snackbar.close();
          setNotes([]);
        }
      }
    };
    getNotes();
  }, [getParam("p"), getParam("f")]);

  return (
    <NotesContext.Provider value={{ notes }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
