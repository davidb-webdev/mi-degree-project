import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router";
import NotesDrawer from "../components/NotesDrawer";
import ProjectView from "../views/dashboard/ProjectView";
import MenuDrawer from "../components/MenuDrawer";
import { useNotesDrawer } from "../utils/useNotesDrawer";
import { SnackbarModal } from "../utils/useSnackbar";
import { ProjectProvider } from "../utils/useProject";
import DashboardToolbar from "../components/DashboardToolbar";
import { ProjectsProvider } from "../utils/useProjects";

const DashboardLayout = () => {
  const [showMenu, setShowMenu] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const notesDrawer = useNotesDrawer();

  return (
    <ProjectsProvider>
      <ProjectProvider>
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
          <DashboardToolbar setShowMenu={setShowMenu} />

          <ProjectView />
        </Box>

        <MenuDrawer
          showMenu={showMenu}
          toggleMenu={() => setShowMenu(!showMenu)}
        />

        <NotesDrawer>
          <Outlet />
        </NotesDrawer>

        <SnackbarModal />
      </ProjectProvider>
    </ProjectsProvider>
  );
};

export default DashboardLayout;
