import { IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import CloseIcon from "@mui/icons-material/Close";

interface CloseButtonProps {
  to: string;
}

const CloseButton = ({ to }: CloseButtonProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.closeButton"
  });

  return (
    <IconButton onClick={() => navigate(to)} aria-label={t("close")}>
      <CloseIcon />
    </IconButton>
  );
};

export default CloseButton;
