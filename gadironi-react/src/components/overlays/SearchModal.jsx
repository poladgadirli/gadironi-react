import { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "../../data/categories";
import { ALL_PRODUCTS, formatPrice } from "../../data/products";
import Button from "../common/Button";

export default function SearchModal({ open, onClose, onAddToCart }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const handler = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const results = query.trim()
    ? ALL_PRODUCTS.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  if (!open) return null;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 80 }}>
      <div onClick={(event) => event.stopPropagation()} style={{ background: "#fff", width: "min(640px, 94vw)", maxHeight: "70vh", overflowY: "auto", boxShadow: "0 32px 80px rgba(0,0,0,0.2)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#999" }}>
            search
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontFamily: "'Manrope', sans-serif",
              fontSize: 14,
              letterSpacing: "0.05em",
              color: "#000",
              background: "transparent",
            }}
          />
          {query && (
            <Button onClick={() => setQuery("")} style={{ display: "flex", color: "#999" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                close
              </span>
            </Button>
          )}
        </div>

        {query.trim() ? (
          <div>
            {results.length === 0 ? (
              <div style={{ padding: "32px 24px", textAlign: "center", color: "#999", fontFamily: "'Manrope', sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                No results for "{query}"
              </div>
            ) : (
              results.map((product) => (
                <div
                  key={product.id}
                  style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 24px", borderBottom: "1px solid rgba(0,0,0,0.05)" }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.background = "#f9f9f9";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.background = "transparent";
                  }}
                >
                  <img src={product.img} alt={product.name} style={{ width: 52, height: 68, objectFit: "cover", filter: "grayscale(1)", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      {product.name}
                    </div>
                    <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, color: "#999", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 4 }}>
                      {product.category}
                    </div>
                  </div>
                  <span style={{ fontFamily: "'Noto Serif', serif", fontStyle: "italic", fontSize: 13 }}>{formatPrice(product.price)}</span>
                  <Button
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    style={{
                      background: "#000",
                      color: "#fff",
                      padding: "8px 16px",
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    Add
                  </Button>
                </div>
              ))
            )}
          </div>
        ) : (
          <div style={{ padding: 24, display: "flex", flexWrap: "wrap", gap: 8 }}>
            <div style={{ width: "100%", fontFamily: "'Manrope', sans-serif", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#999", marginBottom: 8 }}>
              Popular categories
            </div>
            {CATEGORIES.slice(1).map((category) => (
              <Button
                key={category}
                onClick={() => setQuery(category)}
                style={{
                  border: "1px solid rgba(0,0,0,0.12)",
                  padding: "6px 14px",
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                {category}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
