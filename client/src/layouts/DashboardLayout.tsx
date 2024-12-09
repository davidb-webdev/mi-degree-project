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
import { Outlet } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import NotesDrawer from "../components/NotesDrawer";
import FloorPlan from "../components/FloorPlan";
import MenuDrawer from "../components/MenuDrawer";
import { useTheme } from "@mui/material/styles";

const DashboardLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showMenu, setShowMenu] = useState(false);
  const [showNotes, setShowNotes] = useState(isMobile ? false : true);

  const notesWidth = "33vw";

  return (
    <>
      <Box
        sx={{
          mr: !isMobile && showNotes ? notesWidth : 0,
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
          })
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <Button onClick={() => setShowMenu(true)}>
              <IconButton aria-label="menu">
                <MenuIcon />
              </IconButton>
            </Button>

            <Typography variant="h2" sx={{ flexGrow: 1 }}>
              Headline
            </Typography>

            {!isMobile && (
              <Button onClick={() => setShowNotes(!showNotes)}>
                <IconButton aria-label="notes">
                  <MenuIcon />
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

      <NotesDrawer
        showNotes={showNotes}
        toggleNotes={() => setShowNotes(!showNotes)}
      >
        <Outlet />
      </NotesDrawer>
    </>
  );
};

export default DashboardLayout;
