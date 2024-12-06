import { Global } from "@emotion/react";
import { Box, Button, SwipeableDrawer } from "@mui/material";
import { useState } from "react";

const DashboardView = () => {
  const [showNotes, setShowNotes] = useState(false);
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const drawerBleeding = 75;

  return (
    <>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(100% - ${drawerBleeding}px)`,
            overflow: "visible"
          }
        }}
      />
      <h1>Dashboard View</h1>
      <SwipeableDrawer
        anchor="bottom"
        open={showNotes}
        onClose={() => setShowNotes(false)}
        onOpen={() => setShowNotes(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true
        }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <Box
          sx={{
            backgroundColor: "#333",
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
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
          <Box sx={{ pt: 3, pb: 2 }}>
            <Button onClick={() => setShowNotes(!showNotes)}>Show notes</Button>
          </Box>
        </Box>
        <Box
          sx={{ backgroundColor: "#333", height: "100%", overflowY: "scroll" }}
        >
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
          <p>No notes</p>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default DashboardView;
