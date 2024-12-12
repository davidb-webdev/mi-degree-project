import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField
} from "@mui/material";
import { Note } from "../../models/Note";
import { NoteCategories } from "../../models/NoteCategory";
import NotesToolbar from "../../components/NotesToolbar";
import { useNavigate, useLocation } from "react-router";

interface EditNoteViewProps {
  newNote?: boolean;
}

const EditNoteView = ({ newNote }: EditNoteViewProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const note: Note = {
    title: "Note 1",
    categories: [NoteCategories.BlockedEscapeRoute],
    description: "TODO"
  };

  return (
    <>
      <NotesToolbar
        title={newNote ? "New note" : note.title}
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
            Save
          </Button>
        }
      />

      <Stack sx={{ mx: 3 }} spacing={2}>
        <TextField label="Title" />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select label="Category">
            {(
              Object.keys(NoteCategories) as Array<keyof typeof NoteCategories>
            ).map((key) => (
              <MenuItem value={key} key={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField label="Description" />

        <Button variant="contained">Add photos</Button>

        <Button variant="contained">Edit location on floor plan</Button>
      </Stack>
    </>
  );
};

export default EditNoteView;
