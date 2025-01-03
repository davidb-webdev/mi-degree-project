import { Stack } from "@mui/material";
import ModalToolbar from "../../components/ModalToolbar";
import { useTranslation } from "react-i18next";
import CloseButton from "../../components/CloseButton";
import LanguagePicker from "../../components/LanguagePicker";
import SignOutButton from "../../components/SignOutButton";

const UserView = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.user"
  });

  return (
    <>
      <ModalToolbar
        title={t("title")}
        actionButton={<CloseButton to="/dashboard" />}
      />

      <Stack sx={{ mx: 3, mb: 3 }} spacing={2}>
        <LanguagePicker />

        <SignOutButton />
      </Stack>
    </>
  );
};

export default UserView;
