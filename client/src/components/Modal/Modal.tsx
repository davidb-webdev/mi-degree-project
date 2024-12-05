import { Link, useNavigate } from "react-router";
import { Dialog } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface IModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: IModalProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      onClick={() => navigate("/")}
      open={true}
      fullScreen={fullScreen}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <Link to="/">❌</Link>
      <div>{children}</div>
    </Dialog>
  );
};

export default Modal;
