import {
  Button,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotesIcon from "@mui/icons-material/Notes";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useNotesDrawer } from "../utils/useNotesDrawer";
import { useProject } from "../utils/useProject";

interface DashboardToolbarProps {
  setShowMenu: (_value: boolean) => void;
}

const DashboardToolbar = ({ setShowMenu }: DashboardToolbarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const notesDrawer = useNotesDrawer();
  const { project } = useProject();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.layout"
  });

  return (
    <Toolbar disableGutters sx={{ gap: 2, px: 2 }}>
      <IconButton onClick={() => setShowMenu(true)} aria-label={t("openMenu")}>
        <MenuIcon />
      </IconButton>

      <Typography noWrap variant="body1" sx={{ flexGrow: 1 }} fontWeight="bold">
        {project?.title}
      </Typography>

      <Button
        onClick={() => navigate("/dashboard/details")}
        sx={{ mr: isMobile ? 2 : 0 }}
      >
        {t("details")}
      </Button>

      {!isMobile && (
        <IconButton
          onClick={() => notesDrawer.toggle()}
          aria-label={t("openNotes")}
        >
          <NotesIcon />
        </IconButton>
      )}
    </Toolbar>
  );
};

export default DashboardToolbar;
