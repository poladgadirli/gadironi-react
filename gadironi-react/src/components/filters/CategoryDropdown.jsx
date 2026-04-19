import { CATEGORIES } from "../../data/categories";
import DropdownBase from "./DropdownBase";

export default function CategoryDropdown({ category, setCategory, setPage }) {
  return (
    <DropdownBase
      label="All Items"
      options={CATEGORIES}
      value={category}
      onChange={(value) => {
        setCategory(value);
        setPage(1);
      }}
      primary
    />
  );
}
