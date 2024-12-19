import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { NoteCategories } from "../models/Note";
import { useTranslation } from "react-i18next";
import { ProjectStatuses } from "../models/Project";
import { Languages } from "../models/Language";

interface SelectWithPredefinedListProps {
  list: "noteCategories" | "projectStatuses" | "languages";
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const SelectWithPredefinedList = ({
  list,
  label,
  value,
  onChange
}: SelectWithPredefinedListProps) => {
  const { t } = useTranslation("translation", {
    keyPrefix: `models.${list}`
  });

  let importedList;
  switch (list) {
    case "noteCategories": {
      importedList = NoteCategories;
      break;
    }
    case "projectStatuses": {
      importedList = ProjectStatuses;
      break;
    }
    case "languages": {
      importedList = Languages;
      break;
    }
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="categoryLabel">{label}</InputLabel>
      <Select
        label={label}
        labelId="categoryLabel"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {Object.keys(importedList).map((key) => (
          <MenuItem value={key} key={key}>
            {t(key)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectWithPredefinedList;
