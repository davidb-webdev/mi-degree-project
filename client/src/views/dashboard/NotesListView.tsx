import { useNavigate } from "react-router";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";
import ModalToolbar from "../../components/ModalToolbar";
import { useTranslation } from "react-i18next";
import { useNotes } from "../../utils/useNotes";
import { useCustomParams } from "../../utils/useCustomParams";

const NotesListView = () => {
  const { notes } = useNotes();
  const { navigateAndUpdateParams } = useCustomParams();
  const navigate = useNavigate();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.notesList"
  });

  return (
    <>
      <ModalToolbar
        title={t("title")}
        actionButton={
          <Button onClick={() => navigate("/dashboard/note/new")}>
            {t("add")}
          </Button>
        }
      />

      <List sx={{ mb: 7 }}>
        {notes.map((note) => (
          <ListItem key={note._id} disablePadding>
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
