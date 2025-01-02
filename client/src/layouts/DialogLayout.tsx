import { Outlet } from "react-router";
import { Box, Dialog, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCustomParams } from "../utils/useCustomParams";

interface ModalLayoutProps {
  baseUrl: string;
}

const DialogLayout = ({ baseUrl }: ModalLayoutProps) => {
  const { navigateWithParams } = useCustomParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={true}
      onClose={() => navigateWithParams(baseUrl)}
      fullScreen={isMobile}
      keepMounted
      aria-describedby="modalTitle"
    >
      <Box sx={{ maxWidth: "300px" }}>
        <Outlet />
      </Box>
    </Dialog>
  );
};

export default DialogLayout;
