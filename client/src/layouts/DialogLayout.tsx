import { Outlet, useNavigate } from "react-router";
import { Box, Dialog, useTheme } from "@mui/material";
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
      open={true}
      onClose={() => navigate(baseUrl)}
      fullScreen={isMobile}
      keepMounted
      aria-describedby="modalTitle"
    >
      <Box minWidth="300px">
        <Outlet />
      </Box>
    </Dialog>
  );
};

export default DialogLayout;
