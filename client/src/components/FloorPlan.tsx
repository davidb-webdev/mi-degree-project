import { useCustomParams } from "../utils/useCustomParams";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef
} from "react-zoom-pan-pinch";
import { useRef } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useNotes } from "../utils/useNotes";
import FloorPlanImage from "./FloorPlanImage";
import { useTranslation } from "react-i18next";
import useAxios from "../utils/useAxios";
import FloorPlanMarker from "./FloorPlanMarker";
import { useFloor } from "../utils/useFloor";

const FloorPlan = () => {
  const {floor} = useFloor();
  const { notes, refreshNotes } = useNotes();
  const { getParam, navigateAndUpdateParams } = useCustomParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const apiClient = useAxios();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.floorPlan"
  });

  const addMarker = async (x: number, y: number) => {
    const requestBody: {
      title: string;
      floorId: string;
      xCoordinate: number;
      yCoordinate: number;
    } = {
      title: t("draftTitle"),
      floorId: getParam("f") ?? "",
      xCoordinate: x,
      yCoordinate: y
    };
    const response = await apiClient.post<{ id: string }>(
      "/api/note",
      requestBody
    );
    refreshNotes();
    navigateAndUpdateParams("/dashboard/note/new", { n: response.data.id }, []);
  };

  const zoomToImage = () => {
    if (transformComponentRef.current) {
      transformComponentRef.current.zoomToElement("floorPlanImage");
    }
  };

  return !getParam("f") ? (
    <></>
  ) : (
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
            src={`/api/${floor?.floorPlanPath}`}
            onLoad={zoomToImage}
            onLongPress={(x: number, y: number) => addMarker(x, y)}
            onContext={(x: number, y: number) => addMarker(x, y)}
          />

          {notes.map((note) => (
            <FloorPlanMarker
              onClick={() =>
                navigateAndUpdateParams(`dashboard/note`, { n: note._id }, [])
              }
              note={note}
              key={note._id}
            />
          ))}
        </Box>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default FloorPlan;
