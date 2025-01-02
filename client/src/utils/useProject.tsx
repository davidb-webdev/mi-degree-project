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
}

const ProjectContext = createContext<ProjectContextProps>({
  project: undefined,
  setProject: () => {}
});

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const { getParam } = useCustomParams();
  const [project, setProject] = useState<WithId<Project> | undefined>();
  const apiClient = useAxios();
  const snackbar = useSnackbar();

  useEffect(() => {
    const getProject = async () => {
      if (getParam("p")) {
        try {
          const response = await apiClient.get<WithId<Project>>(
            `/api/project/${getParam("p")}`
          );
          setProject(response.data);
        } catch (error) {
          snackbar.close();
          setProject(undefined);
        }
      }
    };
    getProject();
  }, [getParam("p")]);

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
