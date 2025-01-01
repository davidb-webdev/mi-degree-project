import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  useMediaQuery,
  useTheme
} from "@mui/material";
import FloorPlanView from "./FloorPlanView";
import { useFloors } from "../../utils/useFloors";
import { useCustomParams } from "../../utils/useCustomParams";
import { useTranslation } from "react-i18next";

const ProjectView = () => {
  const { floors } = useFloors();
  const { getParam, navigateAndUpdateParams } = useCustomParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.project"
  });

  const onChange = (event: SelectChangeEvent) => {
    if (event.target.value === "editFloors") {
      navigateAndUpdateParams("/dashboard/floors", {}, ["n"]);
    } else {
      navigateAndUpdateParams("/dashboard", { f: event.target.value ?? "" }, [
        "n"
      ]);
    }
  };

  return (
    <>
      <FormControl
        sx={{
          position: "absolute",
          bottom: isMobile ? "4.5rem" : "1.5rem",
          left: "1.5rem",
          zIndex: 100
        }}
      >
        <Select
          name="floor"
          labelId="floorLabel"
          onChange={(event) => onChange(event)}
          value={getParam("f") ?? ""}
          inputProps={{ "aria-label": t("floor") }}
          sx={{ backgroundColor: theme.palette.primary.light }}
        >
          {floors.map((floor) => (
            <MenuItem value={floor._id} key={floor._id}>
              {floor.title}
            </MenuItem>
          ))}
          <MenuItem value="editFloors">{t("editFloors")}</MenuItem>
        </Select>
      </FormControl>

      <FloorPlanView />
    </>
  );
};

export default ProjectView;
