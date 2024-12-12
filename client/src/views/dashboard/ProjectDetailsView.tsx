import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import ModalToolbar from "../../components/ModalToolbar";
import { useNavigate } from "react-router";
import CloseIcon from "@mui/icons-material/Close";
import { Project, ProjectStatus } from "../../models/Project";

const ProjectDetailsView = () => {
  const navigate = useNavigate();

  const project: Project = {
    title: "Project 1",
    description: "TODO",
    status: ProjectStatus.InProgress,
    owner: "user1",
    createdAt: new Date(),
    editedAt: new Date()
  };

  return (
    <>
      <ModalToolbar
        title={project.title}
        actionButton={
          <IconButton onClick={() => navigate("/dashboard")} aria-label="close">
            <CloseIcon />
          </IconButton>
        }
      />

      <Stack sx={{ mx: 3, mb: 3 }} spacing={2}>
        <Box>
          <Typography variant="subtitle2">Status</Typography>
          <Typography variant="body1">{project.status}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2">Description</Typography>
          <Typography variant="body1">{project.description}</Typography>
        </Box>

        <Button onClick={() => navigate("edit")}>Edit info</Button>
      </Stack>
    </>
  );
};

export default ProjectDetailsView;
