import { Link, useNavigate } from "react-router";
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

const NotesListView = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.notesList"
  });

  const notes = [{ link: "/dashboard/notes/1", text: "Note 1" }];

  return (
    <>
      <ModalToolbar
        title={t("title")}
        actionButton={
          <Button onClick={() => navigate("/dashboard/notes/new")}>{t("add")}</Button>
        }
      />

      <List sx={{ mb: 7 }}>
        {notes.map((note) => (
          <ListItem key={note.text} disablePadding>
            <ListItemButton component={Link} to={note.link}>
              <ListItemText>{note.text}</ListItemText>
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
