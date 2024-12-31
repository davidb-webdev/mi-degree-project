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
}

const NoteContext = createContext<NoteContextProps>({
  note: undefined,
  setNote: () => {}
});

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [note, setNote] = useState<WithId<Note> | undefined>();
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
  }, [getParam("n")]);

  return (
    <NoteContext.Provider
      value={{
        note,
        setNote
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = () => useContext(NoteContext);
