import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useSnackbar } from "../utils/useSnackbar";
import { useAuth } from "../utils/useAuth";

const SignOutButton = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.signOut"
  });

  const onClick = async () => {
    signOut();
    snackbar.open("success", t("success"));
    navigate("/start");
  };

  return <Button onClick={onClick}>{t("signOut")}</Button>;
};

export default SignOutButton;
