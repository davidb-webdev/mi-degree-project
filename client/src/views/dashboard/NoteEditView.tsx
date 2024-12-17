import { Button, Stack, TextField } from "@mui/material";
import { Note, NoteCategory } from "../../models/Note";
import ModalToolbar from "../../components/ModalToolbar";
import { useNavigate, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import SelectWithPredefinedList from "../../components/SelectWithPredefinedList";

interface EditNoteViewProps {
  newNote?: boolean;
}

const EditNoteView = ({ newNote }: EditNoteViewProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.noteEdit"
  });

  const note: Note = {
    title: "Note 1",
    categories: [NoteCategory.BlockedEscapeRoute],
    description: "TODO"
  };

  return (
    <>
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
        actionButton={
          <Button
            onClick={() => {
              console.log("Note saved");

              // TODO: Send request
              const returnedId = "1";

              navigate(`/dashboard/notes/${returnedId}`);
            }}
          >
            {t("save")}
          </Button>
        }
      />

      <Stack sx={{ mx: 3 }} spacing={2}>
        <TextField label={t("title")} />

        <SelectWithPredefinedList list="noteCategories" label={t("category")} />

        <TextField multiline label={t("description")} />

        <Button>{t("addPhotos")}</Button>

        <Button>{t("editLocation")}</Button>
      </Stack>
    </>
  );
};

export default EditNoteView;
