import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import { Note, NoteCategory } from "../../models/Note";
import ModalToolbar from "../../components/ModalToolbar";
import { useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import NoteCategoryTag from "../../components/NoteCategoryTag";

const NoteView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.note"
  });

  const note: Note = {
    title: "Note 1",
    category: "BlockedEscapeRoute",
    description: "TODO"
  };

  return (
    <>
      <ModalToolbar
        title={note.title}
        backPath="/dashboard"
        actionButton={
          <Button onClick={() => navigate(`${location.pathname}/edit`)}>
            {t("edit")}
          </Button>
        }
      />

      <Skeleton variant="rectangular" height={200} sx={{ my: 2 }} />

      <Stack sx={{ mx: 3 }} spacing={2}>
        <Box>
          <Typography variant="subtitle2">{t("category")}</Typography>
          <Typography
            variant="body1"
            sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}
          >
            <NoteCategoryTag label={note.category} />
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2">{t("description")}</Typography>
          <Typography variant="body1">{note.description}</Typography>
        </Box>
      </Stack>
    </>
  );
};

export default NoteView;
