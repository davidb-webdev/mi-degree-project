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
import { Project, ProjectStatus, ProjectStatuses } from "../../models/Project";

interface ProjectDetailsEditViewProps {
  newProject?: boolean;
}

const ProjectDetailsEditView = ({
  newProject
}: ProjectDetailsEditViewProps) => {
  const { project, setProject } = useProject();
  const [formData, setFormData] = useState(
    project ?? new Project("", "", ProjectStatuses.Draft)
  );
  const { refreshProjects } = useProjects();
  const { getParam, navigateWithParams } = useCustomParams();
  const snackbar = useSnackbar();
  const apiClient = useAxios();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.projectDetailsEdit"
  });

  useEffect(() => {
    if (newProject) {
      setFormData(
        new Project(
          project?.title ?? "",
          project?.description ?? "",
          project?.status ?? ProjectStatuses.Draft
        )
      );
    }
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
    const { title, description, status } = formData;
    const requestBody: {
      title: string;
      description: string;
      status: ProjectStatus;
    } = {
      title,
      description,
      status
    };
    await apiClient.patch<{ success: boolean }>(
      `/api/project/${getParam("p")}`,
      requestBody
    );
    setProject({ ...project!, ...formData });
    refreshProjects();
    snackbar.open("success", t("success"));
    navigateWithParams(newProject ? "/dashboard" : "/dashboard/details");
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
          maxRows={10}
          required
        />

        <Button type="submit" variant="contained">
          {t("submit")}
        </Button>
      </Stack>
    </form>
  );
};

export default ProjectDetailsEditView;
