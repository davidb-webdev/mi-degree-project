import { useParams } from "react-router";

const NoteView = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <p>Note</p>
      <p>ID: {id}</p>
    </>
  );
};

export default NoteView;
