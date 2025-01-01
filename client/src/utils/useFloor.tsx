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

interface FloorContextProps {
  floor: WithId<Floor> | undefined;
  setFloor: (_value: WithId<Floor> | undefined) => void;
}

const FloorContext = createContext<FloorContextProps>({
  floor: undefined,
  setFloor: () => {}
});

export const FloorProvider = ({ children }: { children: ReactNode }) => {
  const { getParam } = useCustomParams();
  const [floor, setFloor] = useState<WithId<Floor> | undefined>();
  const apiClient = useAxios();
  const snackbar = useSnackbar();

  useEffect(() => {
    const getFloor = async () => {
      if (getParam("f")) {
        try {
          const response = await apiClient.get<WithId<Floor>>(
            `/api/floor/${getParam("f")}`
          );
          setFloor(response.data);
        } catch (error) {
          snackbar.close();
          setFloor(undefined);
        }
      }
    };
    getFloor();
  }, [getParam("f")]);

  return (
    <FloorContext.Provider
      value={{
        floor,
        setFloor
      }}
    >
      {children}
    </FloorContext.Provider>
  );
};

export const useFloor = () => useContext(FloorContext);
