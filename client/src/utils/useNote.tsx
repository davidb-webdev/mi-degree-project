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

interface NoteContextProps {
  note: WithId<Note> | undefined;
  setNote: (_value: WithId<Note> | undefined) => void;
  refreshNote: () => void;
}

const NoteContext = createContext<NoteContextProps>({
  note: undefined,
  setNote: () => {},
  refreshNote: () => {}
});

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [note, setNote] = useState<WithId<Note> | undefined>();
  const [reloadKey, setReloadKey] = useState(0);
  const apiClient = useAxios();
  const snackbar = useSnackbar();
  const { getParam } = useCustomParams();

  useEffect(() => {
    const getNote = async () => {
      if (getParam("n")) {
        try {
          const response = await apiClient.get<WithId<Note>>(
            `/api/note/${getParam("n")}`
          );
          setNote(response.data);
        } catch (error) {
          snackbar.close();
          setNote(undefined);
        }
      }
    };
    getNote();
  }, [getParam("n"), reloadKey]);

  const refreshNote = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return (
    <NoteContext.Provider
      value={{
        note,
        setNote,
        refreshNote
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = () => useContext(NoteContext);
