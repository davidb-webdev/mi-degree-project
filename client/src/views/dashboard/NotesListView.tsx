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
import { useProject } from "../../utils/useProject";

const NotesListView = () => {
  const { project } = useProject();
  const { notes, refreshNotes } = useNotes();
  const { getParam, navigateAndUpdateParams } = useCustomParams();
  const apiClient = useAxios();
  const { t, i18n } = useTranslation("translation", {
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

      {getParam("p") && (
        <Box sx={{ position: "absolute", bottom: 0, width: "100%", p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={async () => {
              const requestBody = {
                projectId: getParam("p"),
                language: i18n.resolvedLanguage
              };
              const response = await apiClient.post<{ documentPath: string }>(
                `/api/document`,
                requestBody
              );

              const documentResponse = await apiClient.get(
                `/api/${response.data.documentPath}`,
                { responseType: "blob" }
              );

              const blob = new Blob([documentResponse.data]);
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `${project?.title ?? "project"}.docx`;
              document.body.appendChild(a);
              a.click();
              a.remove();
              window.URL.revokeObjectURL(url);
            }}
          >
            {t("export")}
          </Button>
        </Box>
      )}
    </>
  );
};

export default NotesListView;
