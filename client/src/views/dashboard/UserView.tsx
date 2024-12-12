import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import ModalToolbar from "../../components/ModalToolbar";
import { useNavigate } from "react-router";
import CloseIcon from "@mui/icons-material/Close";

const UserView = () => {
  const navigate = useNavigate();

  return (
    <>
      <ModalToolbar
        title="User profile"
        actionButton={
          <IconButton onClick={() => navigate("/dashboard")} aria-label="close">
            <CloseIcon />
          </IconButton>
        }
      />

      <Stack sx={{ mx: 3, mb: 3 }} spacing={2}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>U</Box>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Name Lastname
            </Typography>
            <Typography variant="body1">email@example.com</Typography>
          </Box>
        </Box>
        <Button onClick={() => navigate("edit")}>Edit user</Button>
        <Button onClick={() => navigate("editpassword")}>
          Change password
        </Button>
        <Button onClick={() => navigate("/start")}>Sign out</Button>
      </Stack>
    </>
  );
};

export default UserView;
