import { Button, Stack, TextField } from "@mui/material";
import ModalToolbar from "../../components/ModalToolbar";
import { useNavigate } from "react-router";
import { Project, ProjectStatus } from "../../models/Project";
import { useTranslation } from "react-i18next";
import SelectWithPredefinedList from "../../components/SelectWithPredefinedList";
import CloseButton from "../../components/CloseButton";

const ProjectDetailsEditView = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.projectDetailsEdit"
  });

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
        backPath="/dashboard/details"
        actionButton={<CloseButton to="/dashboard" />}
      />

      <Stack sx={{ mx: 3, mb: 3 }} spacing={2}>
        <TextField label={t("title")} />

        <SelectWithPredefinedList list="projectStatuses" label={t("status")} />

        <TextField label={t("description")} />

        <Button
          variant="contained"
          onClick={() => {
            console.log("Project details saved");
            navigate("/dashboard/details");
          }}
        >
          {t("submit")}
        </Button>
      </Stack>
    </>
  );
};

export default ProjectDetailsEditView;
