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
  const apiClient = useAxios();
  const snackbar = useSnackbar();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await apiClient.get(`/api/projects`);
        setProjects(response.data);
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
