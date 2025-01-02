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

interface ProjectsContextProps {
  projects: WithId<Project>[];
  refreshProjects: () => void;
}

const ProjectsContext = createContext<ProjectsContextProps>({
  projects: [],
  refreshProjects: () => {}
});

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<WithId<Project>[]>([]);
  const [reloadKey, setReloadKey] = useState(0);
  const { getParam, addParam } = useCustomParams();
  const apiClient = useAxios();
  const snackbar = useSnackbar();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await apiClient.get<WithId<Project>[]>(
          "/api/projects"
        );
        setProjects(response.data);
        if (!getParam("p") && response.data.length > 0) {
          const firstProject = response.data[0];
          addParam("p", firstProject._id);
        }
      } catch (error) {
        snackbar.close();
        setProjects([]);
      }
    };
    getProjects();
  }, [reloadKey]);

  const refreshProjects = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return (
    <ProjectsContext.Provider value={{ projects, refreshProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);
