import { useState } from "react";
import { formatPrice } from "../../data/products";
import "./ProductCard.css";

export default function ProductCard({ product, onAddToCart }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="product-card" style={{ background: "#f9f9f9" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="product-image-wrap" style={{ aspectRatio: "3/4", overflow: "hidden", background: "#eeeeee", position: "relative" }}>
        <img
          className="product-image"
          src={product.img}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "grayscale(1)",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.7s ease",
          }}
        />
        <button
          className="add-button"
          onClick={handleAdd}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            background: added ? "#2a7a2a" : "#000",
            color: "#fff",
            padding: 12,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s, background 0.2s",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
            {added ? "check" : "add"}
          </span>
        </button>
      </div>
      <div className="product-content" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="product-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "-0.02em", textTransform: "uppercase", margin: 0, lineHeight: 1 }}>
            {product.name}
          </h3>
          <span style={{ fontFamily: "'Noto Serif', serif", fontStyle: "italic", fontSize: 13 }}>{formatPrice(product.price)}</span>
        </div>
        <div className="color-row" style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {product.colors.map((color, index) => (
            <div
              key={`${product.id}-${color}-${index}`}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: color,
                border: color === "#ffffff" ? "1px solid #ccc" : "none",
                outline: index === 0 ? "1px solid #000" : "none",
                outlineOffset: 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
