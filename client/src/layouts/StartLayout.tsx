import { Link, Outlet } from "react-router";

const StartLayout = () => {
  return (
    <>
      StartLayout
      <nav>
        <Link to="/start">Start</Link>
        <Link to="/start/register">Register</Link>
        <Link to="/start/signin">Sign in</Link>
      </nav>
      <Outlet />
    </>
  );
};

export default StartLayout;
