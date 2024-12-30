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
import { Floor } from "../models/Floor";
import { useCustomParams } from "./useCustomParams";

interface FloorsContextProps {
  floors: WithId<Floor>[];
  refreshFloors: () => void;
}

const FloorsContext = createContext<FloorsContextProps>({
  floors: [],
  refreshFloors: () => {}
});

export const FloorsProvider = ({ children }: { children: ReactNode }) => {
  const [floors, setFloors] = useState<WithId<Floor>[]>([]);
  const [reloadKey, setReloadKey] = useState(0);
  const apiClient = useAxios();
  const snackbar = useSnackbar();
  const { getParam } = useCustomParams();

  useEffect(() => {
    const getFloors = async () => {
      try {
        const response = await apiClient.get(`/api/floors/${getParam("p")}`);
        setFloors(response.data);
      } catch (error) {
        snackbar.close();
        setFloors([]);
      }
    };
    getFloors();
  }, [getParam("p"), reloadKey]);

  const refreshFloors = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return (
    <FloorsContext.Provider value={{ floors, refreshFloors }}>
      {children}
    </FloorsContext.Provider>
  );
};

export const useFloors = () => useContext(FloorsContext);
