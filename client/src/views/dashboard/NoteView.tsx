import {
  Box,
  Button,
  Skeleton,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import { Note } from "../../models/Note";
import { NoteCategories } from "../../models/NoteCategory";
import NotesToolbar from "../../components/NotesToolbar";
import { useLocation, useNavigate } from "react-router";

const NoteView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const note: Note = {
    title: "Note 1",
    categories: [NoteCategories.BlockedEscapeRoute],
    description: "TODO"
  };

  return (
    <>
      <NotesToolbar
        title={note.title}
        backPath="/dashboard"
        actionButton={
          <Button onClick={() => navigate(`${location.pathname}/edit`)}>
            Edit
          </Button>
        }
      />

      <Skeleton variant="rectangular" height={200} sx={{ my: 2 }} />

      <Stack sx={{ mx: 3 }} spacing={2}>
        <Box>
          <Typography variant="subtitle2">Category</Typography>
          <Typography
            variant="body1"
            sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}
          >
            {note.categories.map((category) => (
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.dark,
                  color: theme.palette.primary.light,
                  px: "5px",
                  borderRadius: "5px"
                }}
              >
                {category}
              </Box>
            ))}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2">Description</Typography>
          <Typography variant="body1">TODO</Typography>
        </Box>
      </Stack>
    </>
  );
};

export default NoteView;
