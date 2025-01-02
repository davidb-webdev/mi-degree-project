import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useCustomParams } from "../utils/useCustomParams";

interface ModalToolbarProps {
  backButton?: string | (() => void);
  title: string;
  actionButton?: ReactNode;
}

const ModalToolbar = ({
  backButton,
  title,
  actionButton
}: ModalToolbarProps) => {
  const { navigateWithParams } = useCustomParams();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.modalToolbar"
  });

  return (
    <Toolbar
      disableGutters
      sx={{ gap: 2, px: 2, justifyContent: "space-between" }}
    >
      <Box minWidth={40}>
        {backButton && (
          <IconButton
            onClick={
              typeof backButton === "string"
                ? () => navigateWithParams(backButton)
                : backButton
            }
            aria-label={t("back")}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        )}
      </Box>

      <Typography
        id="modalTitle"
        noWrap
        variant="body1"
        sx={{ fontWeight: 600 }}
      >
        {title}
      </Typography>

      <Box minWidth={40}>{actionButton}</Box>
    </Toolbar>
  );
};

export default ModalToolbar;
