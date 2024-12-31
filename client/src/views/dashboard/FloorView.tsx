import { useFloor } from "../../utils/useFloor";
import { useCustomParams } from "../../utils/useCustomParams";

const FloorView = () => {
  const { floor } = useFloor();
  const { getParam } = useCustomParams();

  return !getParam("f") ? <></> : <>{floor?.title}</>;
};

export default FloorView;
