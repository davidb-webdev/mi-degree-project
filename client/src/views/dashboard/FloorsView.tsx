import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack
} from "@mui/material";
import { useCustomParams } from "../../utils/useCustomParams";
import { useFloors } from "../../utils/useFloors";
import { useTranslation } from "react-i18next";
import useAxios from "../../utils/useAxios";
import ModalToolbar from "../../components/ModalToolbar";
import CloseButton from "../../components/CloseButton";
import DeleteIcon from "@mui/icons-material/Delete";

const FloorsView = () => {
  const { floors, refreshFloors } = useFloors();
  const { getParam, updateParams, navigateAndUpdateParams } = useCustomParams();
  const apiClient = useAxios();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.floors"
  });

  const onNewFloor = async () => {
    const response = await apiClient.post<{
      id: string;
    }>("/api/floor", {
      title: t("draftTitle"),
      projectId: getParam("p")
    });
    refreshFloors();
    navigateAndUpdateParams("/dashboard/floor/new", { f: response.data.id }, [
      "n"
    ]);
  };

  const onDeleteFloor = async (id: string) => {
    await apiClient.delete<{ success: boolean }>(`/api/floor/${id}`);
    if (getParam("f") === id) {
      updateParams({}, ["f", "n"]);
    }
    refreshFloors();
  };

  return (
    <>
      <ModalToolbar
        title={t("floors")}
        actionButton={<CloseButton to="/dashboard" />}
      />
      <Stack sx={{ mx: 3, mb: 3 }} spacing={2}>
        <List disablePadding>
          {floors.map((floor) => (
            <ListItem
              disableGutters
              key={floor._id}
              secondaryAction={
                <IconButton
                  aria-label={t("deleteFloor")}
                  onClick={() => onDeleteFloor(floor._id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton
                onClick={() => {
                  navigateAndUpdateParams(
                    "/dashboard/floor/edit",
                    { f: floor._id },
                    ["n"]
                  );
                }}
              >
                <ListItemText>{floor.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Button onClick={onNewFloor}>{t("newFloor")}</Button>
      </Stack>
    </>
  );
};

export default FloorsView;
