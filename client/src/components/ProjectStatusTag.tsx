import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface NoteCategoryTagProps {
  label: string;
}

const ProjectStatusTag = ({ label }: NoteCategoryTagProps) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "models.projectStatuses"
  });

  return <Typography variant="body1">{t(label)}</Typography>;
};

export default ProjectStatusTag;
