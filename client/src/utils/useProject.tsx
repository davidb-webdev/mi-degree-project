import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import useAxios from "./useAxios";
import { useSnackbar } from "./useSnackbar";
import { Project } from "../models/Project";
import { WithId } from "../models/General";
import { useCustomParams } from "./useCustomParams";

interface ProjectContextProps {
  project: WithId<Project> | undefined;
  setProject: (_value: WithId<Project> | undefined) => void;
  refreshProject: () => void;
}

const ProjectContext = createContext<ProjectContextProps>({
  project: undefined,
  setProject: () => {},
  refreshProject: () => {}
});

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const { getParam } = useCustomParams();
  const [project, setProject] = useState<WithId<Project> | undefined>();
  const [reloadKey, setReloadKey] = useState(0);
  const apiClient = useAxios();
  const snackbar = useSnackbar();

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await apiClient.get(`/api/project/${getParam("p")}`);
        setProject(response.data);
      } catch (error) {
        snackbar.close();
        setProject(undefined);
      }
    };
    getProject();
  }, [getParam("p"), reloadKey]);

  const refreshProject = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
        refreshProject
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
