import { useCustomParams } from "../../utils/useCustomParams";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
  KeepScale
} from "react-zoom-pan-pinch";
import floorPlan from "../../assets/images/fp.png";
import { useRef } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import { Box } from "@mui/material";

const FloorPlanView = () => {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const { getParam } = useCustomParams();

  const zoomToImage = () => {
    if (transformComponentRef.current) {
      transformComponentRef.current.zoomToElement("fp");
    }
  };

  return !getParam("f") ? (
    <></>
  ) : (
    <TransformWrapper
      centerOnInit
      centerZoomedOut
      limitToBounds
      disablePadding
      minScale={0.3}
      maxScale={3}
      initialScale={0.5}
      ref={transformComponentRef}
      doubleClick={{ disabled: true }}
    >
      <TransformComponent
        wrapperStyle={{ width: "100%", height: "calc(100% - 98px)" }}
      >
        <Box sx={{ position: "relative", width: "500px", height: "500px" }}>
          <img
            src={floorPlan}
            id="fp"
            alt="Floor plan"
            onLoad={zoomToImage}
            style={{ width: "100%", height: "100%" }}
          />
          <KeepScale>
            <PlaceIcon
              sx={{
                position: "absolute",
                top: "200px",
                left: "200px",
                backgroundColor: "red"
              }}
            />
          </KeepScale>
        </Box>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default FloorPlanView;
