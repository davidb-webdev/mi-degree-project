import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";
import { NavLink } from "react-router";
import { useProjects } from "../utils/useProjects";
import { useProject } from "../utils/useProject";

interface MenuDrawerProps {
  showMenu: boolean;
  toggleMenu: () => void;
}

const MenuDrawer = ({ showMenu, toggleMenu }: MenuDrawerProps) => {
  const listItems = [{ link: "/dashboard/user", text: "User" }];
  const { projects } = useProjects();
  const { setProjectId } = useProject();

  return (
    <>
      <Drawer open={showMenu} onClose={toggleMenu}>
        <List sx={{ minWidth: "250px" }}>
          {listItems.map((listItem) => (
            <ListItem key={listItem.text} disablePadding>
              <ListItemButton component={NavLink} to={listItem.link}>
                <ListItemText>{listItem.text}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <List sx={{ minWidth: "250px" }}>
          {projects.map((project) => (
            <ListItem key={project._id} disablePadding>
              {/* <ListItemButton component={NavLink} to={`/dashboard/${project._id}`}> */}
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
