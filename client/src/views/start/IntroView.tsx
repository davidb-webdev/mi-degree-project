import {
  Button,
  Container,
  Skeleton,
  Stack,
  Typography,
  Link
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate } from "react-router";

const IntroView = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("translation", { keyPrefix: "intro" });

  return (
    <>
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Skeleton variant="rectangular" height={400} />

        <Stack spacing={3} sx={{ my: 3 }}>
          <Typography variant="body1">{t("key")}</Typography>
          <Typography variant="body1">Ipsum</Typography>
          <Typography variant="body1">Dolor</Typography>
          <Typography variant="body1">Sit</Typography>
          <Typography variant="body1">Amet</Typography>
        </Stack>

        <Button
          variant="contained"
          onClick={() => navigate("/start/register")}
          sx={{ mb: 1 }}
        >
          Register now
        </Button>
        <Typography variant="body1" sx={{ mb: 3 }}>
          or{" "}
          <Link component={RouterLink} to="/start/signin">
            Sign in
          </Link>
        </Typography>
      </Container>
    </>
  );
};

export default IntroView;
