import { Box, Button, Stack, Toolbar } from "@mui/material";
import { Navigate, Outlet, useNavigate } from "react-router";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { useTranslation } from "react-i18next";
import { SnackbarModal } from "../utils/useSnackbar";
import { useAuth } from "../utils/useAuth";

const StartLayout = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation("translation", {
    keyPrefix: "start.layout"
  });

  if (auth === undefined) {
    return <>Loading...</>;
  }

  return auth ? (
    <Navigate to="/dashboard" />
  ) : (
    <Box className="scrollable">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Button
          aria-label="start page"
          onClick={() => navigate("/start")}
          startIcon={<LocalFireDepartmentIcon />}
        >
          FireInspect
        </Button>
        <Stack direction="row">
          <Button
            onClick={() => navigate("/start/register")}
            sx={{ mr: 2, display: { xs: "none", md: "inline" } }}
          >
            {t("register")}
          </Button>

          <Button variant="contained" onClick={() => navigate("/start/signin")}>
            {t("signIn")}
          </Button>
        </Stack>
      </Toolbar>

      <Outlet />

      <SnackbarModal />
    </Box>
  );
};

export default StartLayout;
