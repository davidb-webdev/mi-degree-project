import {
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import NotesIcon from "@mui/icons-material/Notes";
import NotesDrawer from "../components/NotesDrawer";
import FloorPlan from "../components/FloorPlan";
import MenuDrawer from "../components/MenuDrawer";
import { useNotesDrawer } from "../utils/useNotesDrawer";

const DashboardLayout = () => {
  const [showMenu, setShowMenu] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const notesDrawer = useNotesDrawer();

  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.light,
          height: "100dvh",
          mr: !isMobile && notesDrawer.open ? notesDrawer.width : 0,
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
          })
        }}
      >
        <Toolbar disableGutters sx={{gap: 2, px: 2}}>
          <IconButton onClick={() => setShowMenu(true)} aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Typography
            noWrap
            variant="body1"
            sx={{ flexGrow: 1 }}
            fontWeight="bold"
          >
            Project name
          </Typography>

          <Button
            onClick={() => navigate("/dashboard/details")}
            sx={{ mr: isMobile ? 2 : 0 }}
          >
            Details
          </Button>

          {!isMobile && (
            <IconButton onClick={() => notesDrawer.toggle()} aria-label="notes">
              <NotesIcon />
            </IconButton>
          )}
        </Toolbar>

        <FloorPlan />
      </Box>

      <MenuDrawer
        showMenu={showMenu}
        toggleMenu={() => setShowMenu(!showMenu)}
      />

      <NotesDrawer>
        <Outlet />
      </NotesDrawer>
    </>
  );
};

export default DashboardLayout;
