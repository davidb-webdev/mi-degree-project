import { Link } from "react-router";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const NotesListView = () => {
  const notes = [{ link: "/dashboard/notes/1", text: "Note 1" }];

  return (
    <List>
      {notes.map((note) => (
        <ListItem key={note.text} disablePadding>
          <ListItemButton component={Link} to={note.link}>
            <ListItemText>{note.text}</ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default NotesListView;
