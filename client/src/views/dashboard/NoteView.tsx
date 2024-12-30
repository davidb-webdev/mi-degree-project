import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import ModalToolbar from "../../components/ModalToolbar";
import { useTranslation } from "react-i18next";
import NoteCategoryTag from "../../components/NoteCategoryTag";
import { useNote } from "../../utils/useNote";
import { useCustomParams } from "../../utils/useCustomParams";

const NoteView = () => {
  const { note } = useNote();
  const { navigateWithParams } = useCustomParams();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.note"
  });

  return !note ? (
    <></>
  ) : (
    <>
      <ModalToolbar
        title={note.title}
        backPath="/dashboard"
        actionButton={
          <Button onClick={() => navigateWithParams(`/dashboard/note/edit`)}>
            {t("edit")}
          </Button>
        }
      />

      <Skeleton variant="rectangular" height={200} sx={{ my: 2 }} />

      <Stack sx={{ mx: 3 }} spacing={2}>
        <Box>
          <Typography variant="subtitle2">{t("category")}</Typography>
          <NoteCategoryTag label={note.category} />
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
