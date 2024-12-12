import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useLocation, useNavigate } from "react-router";
import { ReactNode } from "react";

interface NotesToolbarProps {
  backPath?: string;
  actionButton?: ReactNode;
  title: string;
}

const NotesToolbar = ({ backPath, actionButton, title }: NotesToolbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  let rightButton: ReactNode = <></>;
  switch (actionButton) {
    case "newNote":
      rightButton = (
        <Button
          variant="contained"
          onClick={() => navigate("/dashboard/notes/new")}
        >
          Add
        </Button>
      );
      break;
    case "edit":
      rightButton = (
        <Button
          variant="contained"
          onClick={() => navigate(`${location.pathname}/edit`)}
        >
          Edit
        </Button>
      );
      break;
		case "saveNote":
			rightButton = (
				<Button
          variant="contained"
          onClick={() => navigate(`${location.pathname}/edit`)}
        >
          Save
        </Button>
			);
  }

  return (
    <Toolbar
      disableGutters
      sx={{ gap: 2, px: 2, justifyContent: "space-between" }}
    >
      <Box minWidth={64}>
        {backPath && (
          <IconButton onClick={() => navigate(backPath)} aria-label="back">
            <ArrowBackIosNewIcon />
          </IconButton>
        )}
      </Box>

      <Typography noWrap variant="body1" fontWeight="bold">
        {title}
      </Typography>

      <Box minWidth={40}>{actionButton}</Box>
    </Toolbar>
  );
};

export default NotesToolbar;
