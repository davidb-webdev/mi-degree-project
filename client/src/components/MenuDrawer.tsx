import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";
import { NavLink } from "react-router";

interface MenuDrawerProps {
  showMenu: boolean;
  toggleMenu: () => void;
}

const MenuDrawer = ({ showMenu, toggleMenu }: MenuDrawerProps) => {
  const listItems = [{ link: "/dashboard/user", text: "User" }];

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
      </Drawer>
    </>
  );
};

export default MenuDrawer;
