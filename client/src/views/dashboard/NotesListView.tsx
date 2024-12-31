import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";
import ModalToolbar from "../../components/ModalToolbar";
import { useTranslation } from "react-i18next";
import { useNotes } from "../../utils/useNotes";
import { useCustomParams } from "../../utils/useCustomParams";
import useAxios from "../../utils/useAxios";
import DeleteIcon from "@mui/icons-material/Delete";

const NotesListView = () => {
  const { notes, refreshNotes } = useNotes();
  const { getParam, navigateAndUpdateParams } = useCustomParams();
  const apiClient = useAxios();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.notesList"
  });

  const onDeleteNote = async (id: string) => {
    await apiClient.delete<{ id: string }>(`/api/note/${id}`);
    refreshNotes();
  };

  return (
    <>
      <ModalToolbar
        title={t("title")}
        actionButton={
          <Button
            onClick={async () => {
              const requestBody: { title: string; floorId: string } = {
                title: t("draftTitle"),
                floorId: getParam("f") ?? ""
              };
              const response = await apiClient.post<{ id: string }>(
                "/api/note",
                requestBody
              );
              navigateAndUpdateParams(
                "/dashboard/note/new",
                { n: response.data.id },
                []
              );
            }}
          >
            {t("add")}
          </Button>
        }
      />

      <List sx={{ mb: 7 }}>
        {notes.map((note) => (
          <ListItem
            key={note._id}
            disablePadding
            secondaryAction={
              <IconButton
                aria-label={t("deleteNote")}
                onClick={() => onDeleteNote(note._id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton
              onClick={() => {
                navigateAndUpdateParams("/dashboard/note", { n: note._id }, []);
              }}
            >
              <ListItemText>{note.title}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ position: "absolute", bottom: 0, width: "100%", p: 2 }}>
        <Button fullWidth variant="contained">
          {t("export")}
        </Button>
      </Box>
    </>
  );
};

export default NotesListView;
