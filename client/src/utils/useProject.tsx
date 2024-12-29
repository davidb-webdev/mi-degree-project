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

interface ProjectContextProps {
  project: WithId<Project> | undefined;
  setProject: (_value: WithId<Project> | undefined) => void;
  projectId: string | undefined;
  setProjectId: (_value: string | undefined) => void;
  refreshProject: () => void;
}

const ProjectContext = createContext<ProjectContextProps>({
  project: undefined,
  setProject: () => {},
  projectId: undefined,
  setProjectId: () => {},
  refreshProject: () => {}
});

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projectId, setProjectId] = useState<string | undefined>();
  const [project, setProject] = useState<WithId<Project> | undefined>();
  const [reloadKey, setReloadKey] = useState(0);
  const apiClient = useAxios();
  const snackbar = useSnackbar();

  useEffect(() => {
    const getProject = async () => {
      try {
        if (!projectId) return;
        const response = await apiClient.get(`/api/project/${projectId}`);
        setProject(response.data);
      } catch (error) {
        snackbar.close();
        setProject(undefined);
      }
    };
    getProject();
  }, [projectId, reloadKey]);

  const refreshProject = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
        projectId,
        setProjectId,
        refreshProject
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
