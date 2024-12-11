import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery
} from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import NotesIcon from "@mui/icons-material/Notes";
import NotesDrawer from "../components/NotesDrawer";
import FloorPlan from "../components/FloorPlan";
import MenuDrawer from "../components/MenuDrawer";
import { useTheme } from "@mui/material/styles";
import { NotesTitleProvider } from "../utils/useNotesTitle";

const DashboardLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showMenu, setShowMenu] = useState(false);
  const [showNotes, setShowNotes] = useState(isMobile ? false : true);
  const navigate = useNavigate();

  const notesWidth = "33vw";

  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.light,
          minHeight: "100vh",
          mr: !isMobile && showNotes ? notesWidth : 0,
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
          })
        }}
      >
        <AppBar
          position="static"
          sx={{
            boxShadow: "none",
            backgroundColor: theme.palette.primary.light
          }}
        >
          <Toolbar disableGutters>
            <Button onClick={() => setShowMenu(true)}>
              <IconButton aria-label="menu">
                <MenuIcon />
              </IconButton>
            </Button>

            <Typography
              noWrap
              variant="body1"
              sx={{ flexGrow: 1 }}
              fontWeight="bold"
            >
              Project name
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/dashboard/info")}
              sx={{ mr: isMobile ? 2 : 0 }}
            >
              Details
            </Button>

            {!isMobile && (
              <Button onClick={() => setShowNotes(!showNotes)}>
                <IconButton aria-label="notes">
                  <NotesIcon />
                </IconButton>
              </Button>
            )}
          </Toolbar>
        </AppBar>

        <FloorPlan />
      </Box>

      <MenuDrawer
        showMenu={showMenu}
        toggleMenu={() => setShowMenu(!showMenu)}
      />

      <NotesTitleProvider>
        <NotesDrawer
          showNotes={showNotes}
          toggleNotes={() => setShowNotes(!showNotes)}
          notesWidth={notesWidth}
        >
          <Outlet />
        </NotesDrawer>
      </NotesTitleProvider>
    </>
  );
};

export default DashboardLayout;
