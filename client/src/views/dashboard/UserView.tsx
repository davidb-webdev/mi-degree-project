import { Box, Button } from "@mui/material";

const UserView = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>U</Box>
        <Box>
          <Box>Name Lastname</Box>
          <Box>email@example.com</Box>
        </Box>
      </Box>
      <Button>Change password</Button>
      <Button>Sign out</Button>
    </Box>
  );
};

export default UserView;
