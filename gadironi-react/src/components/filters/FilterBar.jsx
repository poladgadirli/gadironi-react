import Container from "../common/Container";
import CategoryDropdown from "./CategoryDropdown";
import SortDropdown from "./SortDropdown";
import "./FilterBar.css";

export default function FilterBar({
  category,
  setCategory,
  sort,
  setSort,
  setPage,
  filteredLength,
  start,
  end,
}) {
  return (
    <Container style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div className="filters-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 24, borderBottom: "1px solid rgba(0,0,0,0.1)", flexWrap: "wrap", gap: 12 }}>
        <div className="filter-buttons" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <CategoryDropdown category={category} setCategory={setCategory} setPage={setPage} />
          <SortDropdown sort={sort} setSort={setSort} />
        </div>
        <span className="result-count" style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 500, color: "#5f5e5e" }}>
          {filteredLength === 0
            ? "No items"
            : `Showing ${String(start).padStart(2, "0")} - ${String(end).padStart(2, "0")} of ${String(filteredLength).padStart(2, "0")}`}
        </span>
      </div>
    </Container>
  );
}
