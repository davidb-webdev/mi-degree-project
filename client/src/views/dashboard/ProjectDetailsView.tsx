import { Box, Button, Stack, Typography } from "@mui/material";
import ModalToolbar from "../../components/ModalToolbar";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import CloseButton from "../../components/CloseButton";
import { useProject } from "../../utils/useProject";
import ProjectStatusTag from "../../components/ProjectStatusTag";

const ProjectDetailsView = () => {
  const navigate = useNavigate();
  const { project } = useProject();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.projectDetails"
  });

  return !project ? (
    <></>
  ) : (
    <>
      <ModalToolbar
        title={project.title}
        actionButton={<CloseButton to="/dashboard" />}
      />

      <Stack sx={{ mx: 3, mb: 3 }} spacing={2}>
        <Box>
          <Typography variant="subtitle2">{t("status")}</Typography>
          <ProjectStatusTag label={project.status} />
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
