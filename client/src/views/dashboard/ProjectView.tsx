import { useProject } from "../../utils/useProject";

const ProjectView = () => {
  const project = useProject();

  return (
    <>
      {project.projectData?.title}
    </>
  );
};

export default ProjectView;
