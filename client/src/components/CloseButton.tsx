import { IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import { useCustomParams } from "../utils/useCustomParams";

interface CloseButtonProps {
  to: string;
}

const CloseButton = ({ to }: CloseButtonProps) => {
  const { navigateWithParams } = useCustomParams();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.closeButton"
  });

  return (
    <IconButton onClick={() => navigateWithParams(to)} aria-label={t("close")}>
      <CloseIcon />
    </IconButton>
  );
};

export default CloseButton;
