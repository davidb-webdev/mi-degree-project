import { Box, useTheme } from "@mui/material";
import { KeepScale } from "react-zoom-pan-pinch";
import PlaceIcon from "@mui/icons-material/Place";
import { Note } from "../models/Note";
import { useCustomParams } from "../utils/useCustomParams";

interface FloorPlanMarkerProps {
  onClick: () => void;
  note: Note;
}

const FloorPlanMarker = ({ onClick, note }: FloorPlanMarkerProps) => {
  const theme = useTheme();
  const { getParam } = useCustomParams();

  return (
    <Box
      sx={{
        position: "absolute",
        top: `${note.yCoordinate}%`,
        left: `${note.xCoordinate}%`,
        transform: "translate(-50%, -60%)"
      }}
    >
      <KeepScale>
        <PlaceIcon
          onClick={onClick}
          sx={{
            width: "40px",
            height: "40px",
            color:
              getParam("n") === note._id
                ? theme.palette.secondary.main
                : theme.palette.primary.main
          }}
        />
      </KeepScale>
    </Box>
  );
};

export default FloorPlanMarker;
