import { Box, Button, Toolbar } from "@mui/material";
import { Outlet, useNavigate } from "react-router";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

const StartLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Button
          aria-label="start page"
          onClick={() => navigate("/start")}
          startIcon={<LocalFireDepartmentIcon />}
        >
          FireInspect
        </Button>
        <Box>
          <Button onClick={() => navigate("/start/register")} sx={{mr: 2}}>Register</Button>
          <Button variant="contained" onClick={() => navigate("/start/signin")}>Sign in</Button>
        </Box>
      </Toolbar>

      <Outlet />
    </>
  );
};

export default StartLayout;
