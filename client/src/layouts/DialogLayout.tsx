import { Outlet, useNavigate } from "react-router";
import { Box, Button, Dialog } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface ModalLayoutProps {
  baseUrl: string;
}

const DialogLayout = ({ baseUrl }: ModalLayoutProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      onClick={() => navigate(baseUrl)}
      open={true}
      fullScreen={isMobile}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          minWidth: "300px"
        }}
      >
        <Button onClick={() => navigate(baseUrl)} sx={{ alignSelf: "end" }}>
          Close
        </Button>
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Dialog>
  );
};

export default DialogLayout;
