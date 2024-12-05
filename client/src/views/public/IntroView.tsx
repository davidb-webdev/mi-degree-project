import { Link, useLocation } from "react-router";

const IntroView = () => {
  const location = useLocation();

  return (
    <>
      <title>FireInspect</title>
      <h1>IntroView</h1>
      <Link
        to="/register"
        state={{ previousLocation: location }}
      >
        Register
      </Link>
      <Link
        to="/signin"
        state={{ previousLocation: location }}
      >
        Sign in
      </Link>
    </>
  );
};

export default IntroView;
