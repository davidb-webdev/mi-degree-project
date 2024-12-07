import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar
} from "@mui/material";
import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";

const DashboardLayout = () => {
  const [showMenu, setShowMenu] = useState(false);

  const listItems = [
    { link: "/dashboard/notes", text: "Notes" },
    { link: "/dashboard/user", text: "User" }
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={() => setShowMenu(true)}>
            <IconButton
              edge="start"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Button>

          <Drawer open={showMenu} onClose={() => setShowMenu(false)}>
            <List sx={{ minWidth: "250px" }}>
              {listItems.map((listItem) => (
                <ListItem key={listItem.text} disablePadding>
                  <ListItemButton component={NavLink} to={listItem.link}>
                    <ListItemText>
                      {listItem.text}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
};

export default DashboardLayout;
