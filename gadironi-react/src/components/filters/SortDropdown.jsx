import { SORT_OPTIONS } from "../../data/categories";
import DropdownBase from "./DropdownBase";

export default function SortDropdown({ sort, setSort }) {
  return (
    <DropdownBase
      label="Sort by"
      options={SORT_OPTIONS}
      value={sort === "Default" ? null : sort}
      onChange={setSort}
    />
  );
}
