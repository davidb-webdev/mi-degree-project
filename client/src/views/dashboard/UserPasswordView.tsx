import { Button, IconButton, Stack, TextField } from "@mui/material";
import ModalToolbar from "../../components/ModalToolbar";
import { useNavigate } from "react-router";
import CloseIcon from "@mui/icons-material/Close";

const UserPasswordView = () => {
  const navigate = useNavigate();

  return (
    <>
      <ModalToolbar
        title="Change password"
        backPath="/dashboard/user"
        actionButton={
          <IconButton onClick={() => navigate("/dashboard")} aria-label="close">
            <CloseIcon />
          </IconButton>
        }
      />

      <Stack sx={{ mx: 3, mb: 3 }} spacing={2}>
        <TextField label="Current password" type="password" />
        <TextField label="New password" type="password" />

        <Button variant="contained">Save password</Button>
      </Stack>
    </>
  );
};

export default UserPasswordView;
