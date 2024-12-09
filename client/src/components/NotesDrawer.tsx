import {
  Box,
  Button,
  IconButton,
  SwipeableDrawer,
  Toolbar,
  Typography,
  useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Global } from "@emotion/react";
import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from '@mui/icons-material/Close';

interface NotesDrawerProps {
  showNotes: boolean;
  toggleNotes: () => void;
  notesWidth: string;
  children: React.ReactNode;
}

const NotesDrawer = ({
  showNotes,
  toggleNotes,
  notesWidth,
  children
}: NotesDrawerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const drawerBleeding = 48;

  return (
    <>
      {isMobile && (
        <Global
          styles={{
            ".notesDrawer > .MuiPaper-root": {
              height: "100%",
              overflow: "visible"
            }
          }}
        />
      )}

      <SwipeableDrawer
        className="notesDrawer"
        variant={isMobile ? "temporary" : "persistent"}
        anchor={isMobile ? "bottom" : "right"}
        open={showNotes}
        onClose={toggleNotes}
        onOpen={toggleNotes}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true
        }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        {isMobile && (
          <Box
            sx={{
              position: "absolute",
              top: -drawerBleeding,
              borderTopLeftRadius: showNotes ? 0 : 8,
              borderTopRightRadius: showNotes ? 0 : 8,
              visibility: "visible",
              right: 0,
              left: 0,
              textAlign: "center",
              backgroundColor: theme.palette.primary.light,
              boxShadow: "0 -4px 4px rgba(0,0,0,0.1)"
            }}
          >
            <Box
              sx={{
                width: 30,
                height: 6,
                backgroundColor: theme.palette.primary.dark,
                borderRadius: 3,
                position: "absolute",
                top: 8,
                left: "calc(50% - 15px)"
              }}
            />

            <Typography variant="body1" sx={{ my: 2 }}>
              Notes
            </Typography>
          </Box>
        )}

        <Box
          className="scrollable"
          sx={{
            width: isMobile ? "auto" : notesWidth
          }}
        >
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {1 === 1 && (
              <Button onClick={() => navigate("/dashboard")}>
                <IconButton aria-label="back">
                  <ArrowBackIcon />
                </IconButton>
              </Button>
            )}
            <Typography noWrap variant="body1" fontWeight="bold">
              Notes
            </Typography>
            
            <Button onClick={() => toggleNotes()}>
                <IconButton aria-label="close">
                  <CloseIcon />
                </IconButton>
              </Button>
          </Toolbar>
          {children}
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default NotesDrawer;
