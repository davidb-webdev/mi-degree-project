import { Button, Stack, TextField } from "@mui/material";
import ModalToolbar from "../../components/ModalToolbar";
import { useTranslation } from "react-i18next";
import { useNote } from "../../utils/useNote";
import { useCustomParams } from "../../utils/useCustomParams";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useAxios from "../../utils/useAxios";
import { useSnackbar } from "../../utils/useSnackbar";
import { Note, NoteCategories, NoteCategory } from "../../models/Note";
import SelectWithPredefinedList from "../../components/SelectWithPredefinedList";

interface EditNoteViewProps {
  newNote?: boolean;
}

const EditNoteView = ({ newNote }: EditNoteViewProps) => {
  const { note, setNote } = useNote();
  const [formData, setFormData] = useState(
    note ?? new Note("", NoteCategories.BlockedEscapeRoute, "", 1, 1)
  );
  const apiClient = useAxios();
  const snackbar = useSnackbar();
  const { navigateWithParams, navigateAndUpdateParams } = useCustomParams();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.noteEdit"
  });

  useEffect(() => {
    if (newNote) {
      setFormData(
        new Note(
          note?.title ?? "",
          note?.category ?? NoteCategories.BlockedEscapeRoute,
          note?.description ?? "",
          note?.xCoordinate ?? 0,
          note?.yCoordinate ?? 0
        )
      );
    }
  }, [note]);

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, description, category, xCoordinate, yCoordinate } = formData;
    const requestBody: {
      title: string;
      description: string;
      category: NoteCategory;
      xCoordinate: number;
      yCoordinate: number;
    } = {
      title,
      description,
      category,
      xCoordinate,
      yCoordinate
    };
    await apiClient.patch<{ success: boolean }>(
      `/api/note/${note!._id}`,
      requestBody
    );
    setNote({ ...note!, ...formData });
    snackbar.open("success", t("success"));
    navigateWithParams(`/dashboard/note/`);
  };

  return note ? (
    <form onSubmit={onSubmit}>
      <ModalToolbar
        backButton={
          newNote
            ? async () => {
                await apiClient.delete<{ success: boolean }>(
                  `/api/note/${note!._id}`
                );
                navigateAndUpdateParams("/dashboard", {}, ["n"]);
              }
            : "/dashboard/note"
        }
        title={note.title}
        actionButton={<Button type="submit">{t("save")}</Button>}
      />

      <Stack sx={{ mx: 3 }} spacing={2}>
        <TextField
          label={t("title")}
          name="title"
          value={formData.title}
          onChange={handleFormChange}
          required
        />

        <SelectWithPredefinedList
          list="noteCategories"
          label={t("category")}
          name="category"
          onChange={(event) =>
            handleFormChange(event as ChangeEvent<HTMLInputElement>)
          }
          value={formData.category}
        />

        <TextField
          label={t("description")}
          name="description"
          value={formData.description}
          onChange={handleFormChange}
          multiline
          required
        />

        <Button>{t("addPhotos")}</Button>

        <Button>{t("editLocation")}</Button>
      </Stack>
    </form>
  ) : (
    <>{t("notLoaded")}</>
  );
};

export default EditNoteView;
