import {
  Button,
  Container,
  Stack,
  Typography,
  Link,
  Box,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate } from "react-router";
import hero from "../../assets/images/hero.jpg";

const IntroView = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("translation", { keyPrefix: "start.intro" });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Box
          sx={{
            backgroundImage: `url(${hero})`,
            backgroundPosition: "center center",
            backgroundSize: isMobile ? "cover" : "contain",
            width: "100%",
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "5vw",
              color: theme.palette.primary.main,
              textTransform: "uppercase",
              fontWeight: 500
            }}
          >
            BuildingInspect
          </Typography>
        </Box>
        <Stack spacing={5} sx={{ my: 5 }}>
          <Typography variant="body1">{t("p1")}</Typography>
          <Typography variant="body1">{t("p2")}</Typography>
          <Typography variant="body1">{t("p3")}</Typography>
        </Stack>

        <Button
          variant="contained"
          onClick={() => navigate("/start/register")}
          sx={{ mb: 1 }}
        >
          {t("register")}
        </Button>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {`${t("or")} `}
          <Link component={RouterLink} to="/start/signin">
            {t("signIn")}
          </Link>
        </Typography>
      </Container>
    </>
  );
};

export default IntroView;
