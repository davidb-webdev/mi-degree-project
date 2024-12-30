import { Button, Stack, TextField } from "@mui/material";
import ModalToolbar from "../../components/ModalToolbar";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { useNote } from "../../utils/useNote";
import { useCustomParams } from "../../utils/useCustomParams";
import { ChangeEvent, FormEvent, useState } from "react";
import useAxios from "../../utils/useAxios";
import { useSnackbar } from "../../utils/useSnackbar";
import { Note, NoteCategories } from "../../models/Note";
import SelectWithPredefinedList from "../../components/SelectWithPredefinedList";

interface EditNoteViewProps {
  newNote?: boolean;
}

const EditNoteView = ({ newNote }: EditNoteViewProps) => {
  const [formData, setFormData] = useState(
    new Note("", NoteCategories.BlockedEscapeRoute, "", 1, 1)
  );
  const apiClient = useAxios();
  const snackbar = useSnackbar();
  const { note, setNote } = useNote();
  const { navigateWithParams } = useCustomParams();
  const location = useLocation();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.noteEdit"
  });

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await apiClient.patch(`/api/note/${note!._id}`, formData);
    setNote({ ...note!, ...formData });
    snackbar.open("success", t("success"));
    navigateWithParams(`/dashboard/note/`);
  };

  return note ? (
    <form onSubmit={onSubmit}>
      <ModalToolbar
        title={newNote ? t("newNote") : note.title}
        backPath={
          newNote
            ? "/dashboard"
            : `${location.pathname.slice(
                0,
                location.pathname.lastIndexOf("/")
              )}`
        }
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
          value={note.category}
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
