import { Button, Stack, TextField } from "@mui/material";
import ModalToolbar from "../../components/ModalToolbar";
import { useTranslation } from "react-i18next";
import CloseButton from "../../components/CloseButton";

const UserPasswordView = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.userPassword"
  });

  return (
    <>
      <ModalToolbar
        title={t("title")}
        backPath="/dashboard/user"
        actionButton={<CloseButton to="/dashboard" />}
      />

      <Stack sx={{ mx: 3, mb: 3 }} spacing={2}>
        <TextField label={t("currentPassword")} type="password" />
        <TextField label={t("newPassword")} type="password" />

        <Button variant="contained">{t("submit")}</Button>
      </Stack>
    </>
  );
};

export default UserPasswordView;
