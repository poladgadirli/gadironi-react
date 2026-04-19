import { CATEGORIES } from "../../data/categories";
import { useI18n } from "../../i18n";
import DropdownBase from "./DropdownBase";

export default function CategoryDropdown({ category, setCategory, setPage }) {
  const { getCategoryLabel, t } = useI18n();

  return (
    <DropdownBase
      label={t("filter.allItems")}
      options={CATEGORIES}
      value={category}
      getOptionLabel={getCategoryLabel}
      onChange={(value) => {
        setCategory(value);
        setPage(1);
      }}
      primary
    />
  );
}
