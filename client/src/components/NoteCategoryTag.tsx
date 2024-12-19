import { Box, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

interface NoteCategoryTagProps {
  label: string;
}

const NoteCategoryTag = ({ label }: NoteCategoryTagProps) => {
  const theme = useTheme();
  const { t } = useTranslation("translation", {
    keyPrefix: "models.noteCategories"
  });

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.light,
        px: "5px",
        borderRadius: "5px"
      }}
    >
      {t(label)}
    </Box>
  );
};

export default NoteCategoryTag;
