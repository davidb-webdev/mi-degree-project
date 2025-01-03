import {
  Box,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Global } from "@emotion/react";
import { useNotesDrawer } from "../utils/useNotesDrawer";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface NotesDrawerProps {
  children: ReactNode;
}

const NotesDrawer = ({ children }: NotesDrawerProps) => {
  const notesDrawer = useNotesDrawer();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.notesDrawer"
  });

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
        open={notesDrawer.open}
        onClose={notesDrawer.toggle}
        onOpen={notesDrawer.toggle}
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
              borderTopLeftRadius: notesDrawer.open ? 0 : 8,
              borderTopRightRadius: notesDrawer.open ? 0 : 8,
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
              {t("title")}
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            width: isMobile ? "auto" : notesDrawer.width
          }}
        >
          {children}
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default NotesDrawer;
