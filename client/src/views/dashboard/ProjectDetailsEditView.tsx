import { Button, Stack, TextField } from "@mui/material";
import ModalToolbar from "../../components/ModalToolbar";
import { useTranslation } from "react-i18next";
import SelectWithPredefinedList from "../../components/SelectWithPredefinedList";
import CloseButton from "../../components/CloseButton";
import { useProject } from "../../utils/useProject";
import { useSnackbar } from "../../utils/useSnackbar";
import useAxios from "../../utils/useAxios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useProjects } from "../../utils/useProjects";
import { useCustomParams } from "../../utils/useCustomParams";
import { Project, ProjectStatuses } from "../../models/Project";

const ProjectDetailsEditView = () => {
  const { project, setProject } = useProject();
  const [formData, setFormData] = useState(
    new Project("", "", ProjectStatuses.Draft)
  );
  const { refreshProjects } = useProjects();
  const { navigateWithParams } = useCustomParams();
  const snackbar = useSnackbar();
  const apiClient = useAxios();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.projectDetailsEdit"
  });

  useEffect(() => {
    setFormData({
      title: project?.title ?? "",
      status: project?.status ?? ProjectStatuses.Draft,
      description: project?.description ?? ""
    });
  }, [project]);

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await apiClient.patch(`/api/project/${project!._id}`, formData);
    setProject({ ...project!, ...formData });
    refreshProjects();
    snackbar.open("success", t("success"));
    navigateWithParams("/dashboard/details");
  };

  return (
    <form onSubmit={onSubmit}>
      <ModalToolbar
        title={formData.title}
        backButton="/dashboard/details"
        actionButton={<CloseButton to="/dashboard" />}
      />

      <Stack sx={{ mx: 3, mb: 3 }} spacing={2}>
        <TextField
          label={t("title")}
          name="title"
          value={formData.title}
          onChange={handleFormChange}
          required
        />

        <SelectWithPredefinedList
          list="projectStatuses"
          name="status"
          label={t("status")}
          value={formData.status}
          onChange={(event) =>
            handleFormChange(event as ChangeEvent<HTMLInputElement>)
          }
        />

        <TextField
          label={t("description")}
          name="description"
          value={formData.description}
          onChange={handleFormChange}
          multiline
          required
        />

        <Button type="submit" variant="contained" onClick={() => onSubmit}>
          {t("submit")}
        </Button>
      </Stack>
    </form>
  );
};

export default ProjectDetailsEditView;
