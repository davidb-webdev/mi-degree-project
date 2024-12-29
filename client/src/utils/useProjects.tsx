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

interface ProjectsContextProps {
  projects: Project[];
}

const ProjectsContext = createContext<ProjectsContextProps>({
  projects: []
});

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const apiClient = useAxios();
  const snackbar = useSnackbar();

  useEffect(() => {
    console.log("getProjects useEffect");
    const getProjects = async () => {
      try {
        const response = await apiClient.get(`/api/projects`);
        setProjects(response.data);
        console.log("setprojects")
      } catch (error) {
        snackbar.close();
        setProjects([]);
      }
    };
    getProjects();
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);
