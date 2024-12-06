import { useNavigate } from "react-router";
import { Button, Dialog } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface IModalProps {
  show: boolean;
  children: React.ReactNode;
}

const Modal = ({ show, children }: IModalProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      onClick={() => navigate("/")}
      open={show}
      fullScreen={fullScreen}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <Button onClick={() => navigate("/")}>❌</Button>
      <div>{children}</div>
    </Dialog>
  );
};

export default Modal;
