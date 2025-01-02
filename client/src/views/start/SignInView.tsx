import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import ModalToolbar from "../../components/ModalToolbar";
import { Link as RouterLink } from "react-router";
import { useTranslation } from "react-i18next";
import CloseButton from "../../components/CloseButton";
import { ChangeEvent, FormEvent, useState } from "react";
import { SignInFormData } from "../../models/FormData";
import { useAuth } from "../../utils/useAuth";

const SignInView = () => {
  const [formData, setFormData] = useState(new SignInFormData("", ""));
  const { signIn } = useAuth();
  const { t } = useTranslation("translation", { keyPrefix: "start.signIn" });

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn(formData);
  };

  return (
    <form onSubmit={onSubmit}>
      <ModalToolbar
        title={t("title")}
        actionButton={<CloseButton to="/start" />}
      />

      <Stack sx={{ mx: 3, mb: 3 }} spacing={2}>
        <TextField
          label={t("email")}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleFormChange}
          required
        />
        <TextField
          label={t("password")}
          name="password"
          type="password"
          value={formData.password}
          onChange={handleFormChange}
          required
        />

        <Button type="submit" variant="contained">
          {t("submit")}
        </Button>

        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {t("or") + " "}
          <Link component={RouterLink} to="/start/register">
            {t("register")}
          </Link>
        </Typography>
      </Stack>
    </form>
  );
};

export default SignInView;
