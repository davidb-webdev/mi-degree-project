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

interface ProjectContextProps {
  projectData: Project | undefined;
  setProjectId: (_value: string) => void;
}

const ProjectContext = createContext<ProjectContextProps>({
  projectData: undefined,
  setProjectId: () => {}
});

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projectId, setProjectId] = useState<string | undefined>();
  const [projectData, setProjectData] = useState<Project | undefined>();
  const apiClient = useAxios();
  const snackbar = useSnackbar();

  useEffect(() => {
    const getProject = async () => {
      try {
        if (!projectId) return;
        const response = await apiClient.get(`/api/project/${projectId}`);
        setProjectData(response.data);
      } catch (error) {
        snackbar.close();
        setProjectData(undefined);
      }
    };
    getProject();
  }, [projectId]);

  return (
    <ProjectContext.Provider value={{ projectData, setProjectId }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
