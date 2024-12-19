import { Box, Button, Stack, Typography } from "@mui/material";
import ModalToolbar from "../../components/ModalToolbar";
import { useNavigate } from "react-router";
import { Project, ProjectStatus } from "../../models/Project";
import { useTranslation } from "react-i18next";
import CloseButton from "../../components/CloseButton";

const ProjectDetailsView = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.projectDetails"
  });

  const project: Project = {
    title: "Project 1",
    description: "TODO",
    status: "InProgress",
    owner: "user1",
    createdAt: new Date(),
    editedAt: new Date()
  };

  return (
    <>
      <ModalToolbar
        title={project.title}
        actionButton={<CloseButton to="/dashboard" />}
      />

      <Stack sx={{ mx: 3, mb: 3 }} spacing={2}>
        <Box>
          <Typography variant="subtitle2">{t("status")}</Typography>
          <Typography variant="body1">{project.status}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2">{t("description")}</Typography>
          <Typography variant="body1">{project.description}</Typography>
        </Box>

        <Button onClick={() => navigate("edit")}>{t("edit")}</Button>
      </Stack>
    </>
  );
};

export default ProjectDetailsView;
