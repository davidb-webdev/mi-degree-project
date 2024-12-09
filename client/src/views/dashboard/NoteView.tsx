import { Link, useParams } from "react-router";

const NoteView = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <p>Note</p>
      <p>ID: {id}</p>
      <Link to="/dashboard">Go back to all notes</Link>
    </>
  );
};

export default NoteView;
