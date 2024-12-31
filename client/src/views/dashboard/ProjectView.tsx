import { Button } from "@mui/material";
import FloorView from "./FloorView";
import { useFloors } from "../../utils/useFloors";
import { useCustomParams } from "../../utils/useCustomParams";

const ProjectView = () => {
  const { floors } = useFloors();
  const { navigateAndUpdateParams } = useCustomParams();

  return (
    <>
      {floors.map((floor) => (
        <Button
          key={floor._id}
          onClick={() => {
            navigateAndUpdateParams("/dashboard", { f: floor._id }, ["n"]);
          }}
        >
          {floor.title}
        </Button>
      ))}
      <FloorView />
    </>
  );
};

export default ProjectView;
