import {
  Button,
  Container,
  Skeleton,
  Stack,
  Typography,
  Link
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router";

const IntroView = () => {
  const navigate = useNavigate();

  return (
    <>
      <title>FireInspect</title>

      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Skeleton variant="rectangular" height={400} />

        <Stack spacing={3} sx={{ my: 3 }}>
          <Typography variant="body1">Lorem</Typography>
          <Typography variant="body1">Ipsum</Typography>
          <Typography variant="body1">Dolor</Typography>
        </Stack>

        <Button
          variant="contained"
          onClick={() => navigate("/start/register")}
          sx={{ mb: 1 }}
        >
          Register now
        </Button>
        <Typography variant="body1">
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
