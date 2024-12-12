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

const NotesListView = () => {
  const navigate = useNavigate();

  const notes = [{ link: "/dashboard/notes/1", text: "Note 1" }];

  return (
    <>
      <ModalToolbar
        title="Notes"
        actionButton={
          <Button onClick={() => navigate("/dashboard/notes/new")}>Add</Button>
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
          Export to document
        </Button>
      </Box>
    </>
  );
};

export default NotesListView;
