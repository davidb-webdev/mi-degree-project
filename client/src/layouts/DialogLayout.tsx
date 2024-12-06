import { Outlet, useNavigate } from "react-router";
import { Button, Dialog } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface ModalLayoutProps {
  baseUrl: string;
}

const DialogLayout = ({ baseUrl }: ModalLayoutProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      onClick={() => navigate(baseUrl)}
      open={true}
      fullScreen={fullScreen}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <Button onClick={() => navigate(baseUrl)}>❌</Button>
      <Outlet />
    </Dialog>
  );
};

export default DialogLayout;
