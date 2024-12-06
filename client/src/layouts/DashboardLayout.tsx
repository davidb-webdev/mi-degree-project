import { Link, Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <>
      DashboardLayout
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/dashboard/notes">Notes</Link>
        <Link to="/dashboard/user">User</Link>
      </nav>
      <Outlet />
    </>
  );
};

export default DashboardLayout;
