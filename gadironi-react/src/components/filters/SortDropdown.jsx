import { SORT_OPTIONS } from "../../data/categories";
import { useI18n } from "../../i18n";
import DropdownBase from "./DropdownBase";

export default function SortDropdown({ sort, setSort }) {
  const { getSortLabel, t } = useI18n();

  return (
    <DropdownBase
      label={t("filter.sortBy")}
      options={SORT_OPTIONS}
      value={sort === "Default" ? null : sort}
      getOptionLabel={getSortLabel}
      onChange={setSort}
    />
  );
}
