import { Stack } from "@mui/material";
import { useParams } from "react-router";
import { useNotesTitle } from "../../utils/useNotesTitle";

const NoteView = () => {
  const { id } = useParams<{ id: string }>();
  const { setNotesTitle } = useNotesTitle();

  setNotesTitle(`Note ID: ${id}`);

  return (
    <>
      <Stack sx={{ mx: 3 }}>
        <p>Note</p>
        <p>ID: {id}</p>
      </Stack>
    </>
  );
};

export default NoteView;
