import { useCustomParams } from "../../utils/useCustomParams";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
  KeepScale
} from "react-zoom-pan-pinch";
import floorPlan from "../../assets/images/fp.png";
import { useRef, useState } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useNotes } from "../../utils/useNotes";
import FloorPlanImage from "../../components/FloorPlanImage";

const FloorPlanView = () => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const { notes } = useNotes();
  const { getParam, navigateAndUpdateParams } = useCustomParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);

  const addMarker = (x: number, y: number) => {
    setCoordinates({ x, y });
  };

  const zoomToImage = () => {
    if (transformComponentRef.current) {
      transformComponentRef.current.zoomToElement(`fp-${floorPlan}`);
    }
  };

  return !getParam("f") ? (
    <></>
  ) : (
    <>
      <Box>{coordinates.x}</Box>
      <Box>{coordinates.y}</Box>
      <TransformWrapper
        centerOnInit
        minScale={0.3}
        maxScale={3}
        initialScale={0.5}
        ref={transformComponentRef}
        doubleClick={{ disabled: true }}
      >
        <TransformComponent
          wrapperStyle={{
            width: "100%",
            height: isMobile ? "calc(100% - 98px)" : "calc(100% - 64px)"
          }}
        >
          <Box sx={{ position: "relative" }}>
            <FloorPlanImage
              src={floorPlan}
              onLoad={zoomToImage}
              onLongPress={(x: number, y: number) => addMarker(x, y)}
              onContext={(x: number, y: number) => addMarker(x, y)}
            />

            {notes.map((note) => (
              <Box
                key={note._id}
                sx={{
                  position: "absolute",
                  top: `${note.yCoordinate}%`,
                  left: `${note.xCoordinate}%`,
                  transform: "translate(-50%, -60%)"
                }}
              >
                <KeepScale>
                  <PlaceIcon
                    onClick={() =>
                      navigateAndUpdateParams(
                        `dashboard/note`,
                        { n: note._id },
                        []
                      )
                    }
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
            ))}
          </Box>
        </TransformComponent>
      </TransformWrapper>
    </>
  );
};

export default FloorPlanView;
