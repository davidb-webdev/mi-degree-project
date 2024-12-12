import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router";
import { ReactNode } from "react";

interface ModalToolbarProps {
  backPath?: string;
  actionButton?: ReactNode;
  title: string;
}

const ModalToolbar = ({ backPath, actionButton, title }: ModalToolbarProps) => {
  const navigate = useNavigate();

  return (
    <Toolbar
      disableGutters
      sx={{ gap: 2, px: 2, justifyContent: "space-between" }}
    >
      <Box minWidth={40}>
        {backPath && (
          <IconButton onClick={() => navigate(backPath)} aria-label="back">
            <ArrowBackIosNewIcon />
          </IconButton>
        )}
      </Box>

      <Typography id="modalTitle" noWrap variant="body1" sx={{fontWeight: 600}}>
        {title}
      </Typography>

      <Box minWidth={40}>{actionButton}</Box>
    </Toolbar>
  );
};

export default ModalToolbar;
