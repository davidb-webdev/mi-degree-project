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
      onChange={(value) => i18n.changeLanguage(value)}
      value={i18n.resolvedLanguage || "en"}
    />
  );
};

export default LanguagePicker;
