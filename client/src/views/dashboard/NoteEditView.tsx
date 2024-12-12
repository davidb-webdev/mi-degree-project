import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField
} from "@mui/material";
import { Note, NoteCategory } from "../../models/Note";
import ModalToolbar from "../../components/ModalToolbar";
import { useNavigate, useLocation } from "react-router";

interface EditNoteViewProps {
  newNote?: boolean;
}

const EditNoteView = ({ newNote }: EditNoteViewProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const note: Note = {
    title: "Note 1",
    categories: [NoteCategory.BlockedEscapeRoute],
    description: "TODO"
  };

  return (
    <>
      <ModalToolbar
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
          <InputLabel id="categoryLabel">Category</InputLabel>
          <Select label="Category" labelId="categoryLabel">
            {(
              Object.keys(NoteCategory) as Array<keyof typeof NoteCategory>
            ).map((key) => (
              <MenuItem value={key} key={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField multiline label="Description" />

        <Button>Add photos</Button>

        <Button>Edit location on floor plan</Button>
      </Stack>
    </>
  );
};

export default EditNoteView;
