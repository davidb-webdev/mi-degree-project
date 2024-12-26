import { Box, Button, Stack, Typography } from "@mui/material";
import ModalToolbar from "../../components/ModalToolbar";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import CloseButton from "../../components/CloseButton";
import LanguagePicker from "../../components/LanguagePicker";
import { User } from "../../models/User";
import SignOutButton from "../../components/SignOutButton";

const UserView = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.user"
  });

  const user: User = {
    name: "Name Lastname",
    email: "email@example.com"
  };

  return (
    <>
      <ModalToolbar
        title={t("title")}
        actionButton={<CloseButton to="/dashboard" />}
      />

      <Stack sx={{ mx: 3, mb: 3 }} spacing={2}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>U</Box>

          <Box>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {user.name}
            </Typography>

            <Typography variant="body1">{user.email}</Typography>
          </Box>
        </Box>

        <LanguagePicker />

        <Button onClick={() => navigate("edit")}>{t("edit")}</Button>

        <Button onClick={() => navigate("changepassword")}>
          {t("changePassword")}
        </Button>

        <SignOutButton />
      </Stack>
    </>
  );
};

export default UserView;
