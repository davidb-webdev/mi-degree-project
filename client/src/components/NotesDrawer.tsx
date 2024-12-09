import { Box, Button, SwipeableDrawer, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Global } from "@emotion/react";

interface NotesDrawerProps {
  showNotes: boolean;
  toggleNotes: () => void;
  children: React.ReactNode;
}

const NotesDrawer = ({
  showNotes,
  toggleNotes,
  children
}: NotesDrawerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const drawerBleeding = 67;

  return (
    <>
      {isMobile && (
        <Global
          styles={{
            ".notesDrawer > .MuiPaper-root": {
              height: `calc(100% - ${drawerBleeding}px)`,
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
        {!isMobile && showNotes && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8
            }}
          >
            <Button onClick={toggleNotes}>Close</Button>
          </Box>
        )}
				
        <Box
          sx={{
            backgroundColor: "#333",
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: showNotes ? 0 : 8,
            borderTopRightRadius: showNotes ? 0 : 8,
            visibility: "visible",
            right: 0,
            left: 0,
            textAlign: "center",
            color: "#fff"
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 6,
              backgroundColor: "#fff",
              borderRadius: 3,
              position: "absolute",
              top: 8,
              left: "calc(50% - 15px)"
            }}
          />

          <Box sx={{ pt: 1 }}>
            <h3>Notes</h3>
          </Box>

          {isMobile && showNotes && (
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8
              }}
            >
              <Button onClick={toggleNotes}>Close</Button>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            backgroundColor: "#333",
            height: "100%",
            overflowY: "scroll",
            width: isMobile ? "auto" : "33vw"
          }}
        >
          {children}
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default NotesDrawer;
