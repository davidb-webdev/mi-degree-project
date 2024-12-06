import { Button, Drawer } from "@mui/material";
import { useState } from "react";
import { Link, Outlet } from "react-router";

const DashboardLayout = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Button onClick={() => setShowMenu(true)}>Show menu</Button>
      <Drawer open={showMenu} onClose={() => setShowMenu(false)}>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/dashboard/notes">Notes</Link>
          <Link to="/dashboard/user">User</Link>
        </nav>
      </Drawer>
      <Outlet />
    </>
  );
};

export default DashboardLayout;
