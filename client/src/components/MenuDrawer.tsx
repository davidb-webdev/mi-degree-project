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
import { useTranslation } from "react-i18next";
import useAxios from "../utils/useAxios";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCustomParams } from "../utils/useCustomParams";

interface MenuDrawerProps {
  showMenu: boolean;
  toggleMenu: () => void;
}

const MenuDrawer = ({ showMenu, toggleMenu }: MenuDrawerProps) => {
  const navigate = useNavigate();
  const { projects, refreshProjects } = useProjects();
  const apiClient = useAxios();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.menu"
  });
  const { getParam, navigateAndUpdateParams } = useCustomParams();

  const onNewProject = async () => {
    const response = await apiClient.post<{
      projectId: string;
      floorId: string;
    }>("/api/project", {
      title: t("draftTitle")
    });
    toggleMenu();
    refreshProjects();
    navigateAndUpdateParams(
      "/dashboard/details/new",
      { p: response.data.projectId, f: response.data.floorId },
      ["f", "n"]
    );
  };

  const onDeleteProject = async (id: string) => {
    await apiClient.delete<{ success: boolean }>(`/api/project/${id}`);
    if (getParam("p") === id) {
      navigate("/dashboard");
    }
    refreshProjects();
  };

  return (
    <>
      <Drawer open={showMenu} onClose={toggleMenu}>
        <List sx={{ minWidth: "250px" }}>
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="/dashboard/user">
              <ListItemText><ListItemText>{t("userProfile")}</ListItemText></ListItemText>
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
                  aria-label={t("deleteProject")}
                  onClick={() => onDeleteProject(project._id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton
                onClick={() => {
                  navigate(`/dashboard?p=${project._id}`);
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
