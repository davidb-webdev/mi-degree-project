import { Box, Button, Typography } from "@mui/material";

const InfoView = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="subtitle2">Status</Typography>
      <Typography variant="body1">In progress</Typography>

      <Typography variant="subtitle2">Description</Typography>
      <Typography variant="body1">Lorem ipsum</Typography>

      <Button>Edit info</Button>
    </Box>
  );
};

export default InfoView;
