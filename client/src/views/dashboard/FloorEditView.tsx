import { Button, Stack, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import useAxios from "../../utils/useAxios";
import ModalToolbar from "../../components/ModalToolbar";
import CloseButton from "../../components/CloseButton";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Floor } from "../../models/Floor";
import { useFloor } from "../../utils/useFloor";
import { useFloors } from "../../utils/useFloors";
import { useSnackbar } from "../../utils/useSnackbar";
import { useCustomParams } from "../../utils/useCustomParams";

const FloorEditView = () => {
  const { floor, setFloor } = useFloor();
  const [formData, setFormData] = useState(new Floor("", ""));
  const { refreshFloors } = useFloors();
  const snackbar = useSnackbar();
  const apiClient = useAxios();
  const { navigateWithParams } = useCustomParams();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.floorEdit"
  });

  useEffect(() => {
    setFormData(new Floor(floor?.title ?? "", floor?.floorPlanPath ?? ""));
  }, [floor]);

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, floorPlanPath } = formData;
    const requestBody: {
      title: string;
      floorPlanPath: string;
    } = {
      title,
      floorPlanPath
    };
    await apiClient.patch<{ success: boolean }>(
      `/api/floor/${floor!._id}`,
      requestBody
    );
    setFloor({ ...floor!, ...formData });
    refreshFloors();
    snackbar.open("success", t("success"));
    navigateWithParams("/dashboard/floors");
  };

  return (
    <form onSubmit={onSubmit}>
      <ModalToolbar
        title={formData.title}
        backButton="/dashboard/floors"
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

        <Button>{t("uploadPlan")}</Button>

        <Button type="submit" variant="contained">
          {t("submit")}
        </Button>
      </Stack>
    </form>
  );
};

export default FloorEditView;
