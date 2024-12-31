import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import ModalToolbar from "../../components/ModalToolbar";
import { Link as RouterLink, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import CloseButton from "../../components/CloseButton";
import { ChangeEvent, FormEvent, useState } from "react";
import { RegisterFormData } from "../../models/FormData";
import { useSnackbar } from "../../utils/useSnackbar";
import useAxios from "../../utils/useAxios";

const RegisterView = () => {
  const [formData, setFormData] = useState(
    new RegisterFormData("", "", "", "")
  );
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const apiClient = useAxios();
  const { t } = useTranslation("translation", { keyPrefix: "start.register" });

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, password, repeatPassword } = formData;
    if (password !== repeatPassword) {
      snackbar.open("error", t("passwordsMustMatch"));
      return;
    }
    const payload = { name, email, password };
    await apiClient.post<{ success: boolean }>("/api/register", payload);
    snackbar.open("success", t("success"));
    navigate("/");
  };

  return (
    <form onSubmit={onSubmit}>
      <ModalToolbar
        title={t("title")}
        actionButton={<CloseButton to="/start" />}
      />

      <Stack sx={{ mx: 3, mb: 3 }} spacing={2}>
        <TextField
          label={t("name")}
          name="name"
          value={formData.name}
          onChange={handleFormChange}
          required
        />
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
        <TextField
          label={t("repeatPassword")}
          name="repeatPassword"
          type="password"
          value={formData.repeatPassword}
          onChange={handleFormChange}
          required
        />

        <Button type="submit" variant="contained">
          {t("submit")}
        </Button>

        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {t("or") + " "}
          <Link component={RouterLink} to="/start/signin">
            {t("signIn")}
          </Link>
        </Typography>
      </Stack>
    </form>
  );
};

export default RegisterView;
