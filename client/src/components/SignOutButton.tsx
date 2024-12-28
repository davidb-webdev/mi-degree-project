import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAuth } from "../utils/useAuth";

const SignOutButton = () => {
  const { signOut } = useAuth();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.signOut"
  });

  return <Button onClick={() => signOut()}>{t("signOut")}</Button>;
};

export default SignOutButton;
