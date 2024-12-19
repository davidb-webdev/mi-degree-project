import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import ModalToolbar from "../../components/ModalToolbar";
import { Link as RouterLink, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import CloseButton from "../../components/CloseButton";

const RegisterView = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("translation", { keyPrefix: "start.register" });

  return (
    <>
      <ModalToolbar title={t("title")} actionButton={<CloseButton to="/start" />} />

      <Stack sx={{ mx: 3, mb: 3 }} spacing={2}>
        <TextField label={t("name")} />
        <TextField label={t("email")} type="email" />
        <TextField label={t("password")} type="password" />
        <TextField label={t("repeatPassword")} type="password" />

        <Button variant="contained" onClick={() => navigate("/start")}>
          {t("submit")}
        </Button>

        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {t("or") + " "}
          <Link component={RouterLink} to="/start/signin">
            {t("signIn")}
          </Link>
        </Typography>
      </Stack>
    </>
  );
};

export default RegisterView;
