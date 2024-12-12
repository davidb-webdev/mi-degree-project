import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import ModalToolbar from "../../components/ModalToolbar";
import { useNavigate } from "react-router";
import CloseIcon from "@mui/icons-material/Close";

const UserEditView = () => {
  const navigate = useNavigate();

  const user: User = {
    name: "Name Lastname",
    email: "email@example.com"
  };

  return (
    <>
      <ModalToolbar
        title="Edit user"
        backPath="/dashboard/user"
        actionButton={
          <IconButton onClick={() => navigate("/dashboard")} aria-label="close">
            <CloseIcon />
          </IconButton>
        }
      />

      <Stack sx={{ mx: 3, mb: 3 }} spacing={2}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" aria-label="replace picture">
            U
          </Button>
          <Button>Add new picture</Button>
        </Box>

        <TextField label="Name" />

        <TextField label="Email address" type="email" />

        <Button variant="contained">Save user profile</Button>
      </Stack>
    </>
  );
};

export default UserEditView;
