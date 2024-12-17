import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { NoteCategory } from "../models/Note";
import { useTranslation } from "react-i18next";
import { ProjectStatus } from "../models/Project";

interface SelectWithPredefinedListProps {
  list: "noteCategories" | "projectStatuses";
  label: string;
}

const SelectWithPredefinedList = ({
  list,
  label
}: SelectWithPredefinedListProps) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.noteCategories"
  });

  let importedList;
  switch (list) {
    case "noteCategories": {
      importedList = NoteCategory;
      break;
    }
    case "projectStatuses": {
      importedList = ProjectStatus;
      break;
    }
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="categoryLabel">{label}</InputLabel>
      <Select label={label} labelId="categoryLabel">
        {(Object.keys(importedList) as Array<keyof typeof NoteCategory>).map(
          (key) => (
            <MenuItem value={key} key={key}>
              {t(key)}
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
};

export default SelectWithPredefinedList;
