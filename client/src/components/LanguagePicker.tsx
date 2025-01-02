import { useTranslation } from "react-i18next";
import SelectWithPredefinedList from "./SelectWithPredefinedList";

const LanguagePicker = () => {
  const { t, i18n } = useTranslation("translation", {
    keyPrefix: "dashboard.languagePicker"
  });

  return (
    <SelectWithPredefinedList
      list="languages"
      label={t("language")}
      name="language"
      onChange={(event) => i18n.changeLanguage(event.target.value)}
      value={i18n.resolvedLanguage || "sv"}
    />
  );
};

export default LanguagePicker;
