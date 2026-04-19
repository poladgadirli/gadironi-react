import Container from "../common/Container";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

export default function ProductGrid({ products, onAddToCart, page, setPage, totalPages }) {
  return (
    <Container style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {products.length > 0 ? (
        <div className="product-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 1, background: "rgba(0,0,0,0.08)" }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      ) : (
        <div style={{ padding: "80px 0", textAlign: "center", color: "#aaa", fontFamily: "'Manrope', sans-serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase" }}>
          No products in this category
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 40, marginTop: 8 }}>
          <button onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} style={{ color: page === 1 ? "#ccc" : "#5f5e5e" }}>
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              style={{
                color: page === pageNumber ? "#000" : "#5f5e5e",
                borderBottom: page === pageNumber ? "2px solid #000" : "2px solid transparent",
              }}
            >
              {String(pageNumber).padStart(2, "0")}
            </button>
          ))}
          <button onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages} style={{ color: page === totalPages ? "#ccc" : "#5f5e5e" }}>
            Next
          </button>
        </div>
      )}
    </Container>
  );
}
