import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface ModalToolbarProps {
  backPath?: string;
  actionButton?: ReactNode;
  title: string;
}

const ModalToolbar = ({ backPath, actionButton, title }: ModalToolbarProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.modalToolbar"
  });

  return (
    <Toolbar
      disableGutters
      sx={{ gap: 2, px: 2, justifyContent: "space-between" }}
    >
      <Box minWidth={40}>
        {backPath && (
          <IconButton onClick={() => navigate(backPath)} aria-label={t("back")}>
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
