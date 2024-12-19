import { Box, Button, Stack, TextField } from "@mui/material";
import ModalToolbar from "../../components/ModalToolbar";
import { useTranslation } from "react-i18next";
import CloseButton from "../../components/CloseButton";

const UserEditView = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.userEdit"
  });

  const user: User = {
    name: "Name Lastname",
    email: "email@example.com"
  };

  return (
    <>
      <ModalToolbar
        title={t("title")}
        backPath="/dashboard/user"
        actionButton={<CloseButton to="/dashboard" />}
      />

      <Stack sx={{ mx: 3, mb: 3 }} spacing={2}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" aria-label={t("replaceAvatar")}>
            U
          </Button>
          <Button>{t("addPicture")}</Button>
        </Box>

        <TextField label={t("name")} />

        <TextField label={t("email")} type="email" />

        <Button variant="contained">{t("submit")}</Button>
      </Stack>
    </>
  );
};

export default UserEditView;
