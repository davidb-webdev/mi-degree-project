import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import useAxios from "../utils/useAxios";
import { useSnackbar } from "../utils/useSnackbar";

const SignOutButton = () => {
  const apiClient = useAxios();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.signOut"
  });

  const onClick = async () => {
    await apiClient.get("/api/signout");
    snackbar.open("success", t("success"));
    navigate("/start");
  };

  return <Button onClick={onClick}>{t("signOut")}</Button>;
};

export default SignOutButton;
