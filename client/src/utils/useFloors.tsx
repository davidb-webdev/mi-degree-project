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
}

const FloorsContext = createContext<FloorsContextProps>({
  floors: []
});

export const FloorsProvider = ({ children }: { children: ReactNode }) => {
  const [floors, setFloors] = useState<WithId<Floor>[]>([]);
  const apiClient = useAxios();
  const snackbar = useSnackbar();
  const { getParam, addParam } = useCustomParams();

  useEffect(() => {
    const getFloors = async () => {
      if (getParam("p")) {
        try {
          const response = await apiClient.get<WithId<Floor>[]>(
            `/api/floors/${getParam("p")}`
          );
          setFloors(response.data);
          if (!getParam("f") && response.data.length > 0) {
            const firstFloor = response.data[0];
            addParam("f", firstFloor._id);
          }
        } catch (error) {
          snackbar.close();
          setFloors([]);
        }
      }
    };
    getFloors();
  }, [getParam("p")]);

  return (
    <FloorsContext.Provider value={{ floors }}>
      {children}
    </FloorsContext.Provider>
  );
};

export const useFloors = () => useContext(FloorsContext);
