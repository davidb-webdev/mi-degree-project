import {
  Button,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import ModalToolbar from "../../components/ModalToolbar";
import CloseIcon from "@mui/icons-material/Close";
import { Link as RouterLink, useNavigate } from "react-router";

const SignInView = () => {
  const navigate = useNavigate();

  return (
    <>
      <ModalToolbar
        title="Register user"
        actionButton={
          <IconButton onClick={() => navigate("/start")} aria-label="close">
            <CloseIcon />
          </IconButton>
        }
      />

      <Stack sx={{ mx: 3, mb: 3 }} spacing={2}>
        <TextField label="Email address" type="email" />
        <TextField label="Password" type="password" />

        <Button variant="contained" onClick={() => navigate("/dashboard")}>
          Sign in
        </Button>

        <Typography variant="body1" sx={{ textAlign: "center" }}>
          or{" "}
          <Link component={RouterLink} to="/start/register">
            Register
          </Link>
        </Typography>
      </Stack>
    </>
  );
};

export default SignInView;
