import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader
} from "@mui/material";
import { NavLink, useNavigate } from "react-router";
import { useProjects } from "../utils/useProjects";
import { useProject } from "../utils/useProject";
import { useTranslation } from "react-i18next";
import useAxios from "../utils/useAxios";
import DeleteIcon from "@mui/icons-material/Delete";

interface MenuDrawerProps {
  showMenu: boolean;
  toggleMenu: () => void;
}

const MenuDrawer = ({ showMenu, toggleMenu }: MenuDrawerProps) => {
  const { projects, refreshProjects } = useProjects();
  const { projectId, setProjectId, setProject } = useProject();
  const apiClient = useAxios();
  const navigate = useNavigate();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.menu"
  });

  const onNewProject = async () => {
    const response = await apiClient.post<{ id: string }>("/api/project");
    refreshProjects();
    setProjectId(response.data.id);
    navigate("/dashboard/details/new");
    toggleMenu();
  };

  const onDeleteProject = async (id: string) => {
    await apiClient.delete<{ id: string }>(`/api/project/${id}`);
    refreshProjects();

    if (projectId === id) {
      setProjectId(undefined);
      setProject(undefined);
    }
  };

  return (
    <>
      <Drawer open={showMenu} onClose={toggleMenu}>
        <List sx={{ minWidth: "250px" }}>
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="/dashboard/user">
              <ListItemText>TODO: User</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>

        <List sx={{ minWidth: "300px" }}>
          <ListSubheader
            sx={{
              fontSize: "1rem",
              fontWeight: 600,
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            {t("projects")}
            <Button variant="text" onClick={onNewProject}>
              {t("newProject")}
            </Button>
          </ListSubheader>
          {projects.map((project) => (
            <ListItem
              key={project._id}
              disablePadding
              secondaryAction={
                <IconButton
                  aria-label="delete"
                  onClick={() => onDeleteProject(project._id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton
                onClick={() => {
                  setProjectId(project._id);
                  toggleMenu();
                }}
              >
                <ListItemText>{project.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default MenuDrawer;
