import {
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import FloorPlan from "../../components/FloorPlan";
import { useFloors } from "../../utils/useFloors";
import { useCustomParams } from "../../utils/useCustomParams";
import { useTranslation } from "react-i18next";
import { ChangeEvent, FormEvent, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useFloor } from "../../utils/useFloor";
import useAxios from "../../utils/useAxios";
import { useSnackbar } from "../../utils/useSnackbar";

const ProjectView = () => {
  const [showHint, setShowHint] = useState(true);
  const [floorPlanFile, setFloorPlanFile] = useState<File | null>(null);
  const [floorPlanFileName, setFloorPlanFileName] = useState("");
  const { floors } = useFloors();
  const { floor, refreshFloor } = useFloor();
  const apiClient = useAxios();
  const { getParam, navigateAndUpdateParams } = useCustomParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const snackbar = useSnackbar();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.project"
  });

  const onChangeFloor = (event: SelectChangeEvent) => {
    if (event.target.value === "editFloors") {
      navigateAndUpdateParams("/dashboard/floors", {}, ["n"]);
    } else {
      navigateAndUpdateParams("/dashboard", { f: event.target.value ?? "" }, [
        "n"
      ]);
    }
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFloorPlanFile(event.target.files[0]);
      setFloorPlanFileName(event.target.files[0].name);
    }
  };

  const onSubmitFile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!floorPlanFile) {
      snackbar.open("error", "No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("file", floorPlanFile);
    const response = await apiClient.post<{
      success: boolean;
      floorPlanPath: string;
    }>(`/api/floorplan/${getParam("f")}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    console.log(response.data.floorPlanPath);
    refreshFloor();
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
          onChange={(event) => onChangeFloor(event)}
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

      {floor && floor.floorPlanPath.length > 0 ? (
        <>
          <Snackbar
            sx={{ mt: 6 }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={showHint}
            autoHideDuration={5000}
            onClose={() => setShowHint(false)}
            message={t(`floorPlanHint.${isMobile ? "mobile" : "desktop"}`)}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setShowHint(false)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />

          <FloorPlan />
        </>
      ) : (
        <form
          onSubmit={onSubmitFile}
          style={{
            display: "grid",
            justifyContent: "center",
            alignContent: "center",
            height: isMobile ? "calc(100% - 98px)" : "calc(100% - 64px)"
          }}
        >
          <Stack spacing={2} sx={{ textAlign: "center" }}>
            <Typography sx={{ fontWeight: 800 }}>{t("uploadBlurb")}</Typography>
            {floorPlanFile && <Typography>{floorPlanFileName}</Typography>}
            <Button
              variant={floorPlanFile ? "outlined" : "contained"}
              component="label"
            >
              {t("selectFile")}
              <input type="file" hidden onChange={onFileChange} />
            </Button>
            {floorPlanFile && (
              <Button type="submit" variant="contained">
                {t("upload")}
              </Button>
            )}
          </Stack>
        </form>
      )}
    </>
  );
};

export default ProjectView;
