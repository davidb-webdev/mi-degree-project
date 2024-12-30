import { Button } from "@mui/material";
import { useFloors } from "../../utils/useFloors";
import { useFloor } from "../../utils/useFloor";
import { useCustomParams } from "../../utils/useCustomParams";

const FloorView = () => {
  const { floors } = useFloors();
  const { floor } = useFloor();
  const { updateParams } = useCustomParams();

  return (
    <>
      {floors.map((floor) => (
        <Button
          key={floor._id}
          onClick={() => {
            updateParams({ f: floor._id }, ["n"]);
          }}
        >
          {floor.title}
        </Button>
      ))}
      {floor?.title}
    </>
  );
};

export default FloorView;
