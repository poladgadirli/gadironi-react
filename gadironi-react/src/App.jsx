import { useEffect, useRef, useState } from "react";

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBhNqlV7mum3IhvoRVJWzH1sogdWe06kIK_dXICs1yZr1Co72L_4fLEyMJTqw6ZwxP-5HGMuccSwmkMydriGetvbgtLbslpnvypOto8Xm8S-M2rmNngOMUI9bew3ou2BQh0FlndCn69CUeS3Gr0yt1y3a2Gr5PkA1PmefHYHjZqyK4j7omI89xpvK-7_URJiD-yC7TZHPZz4lCpf9DFNQ5NQGiOt1DKP5a92OiKxSt5yFCSayoMjd-lfLbbJd1Sx7xHts8fWU9SZMU";
const NEWSLETTER_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAEI9sOOT73xoGb5qt8YjhgNUuFO2sUu3u3GiaBfLjF1qhUluHI2nbH1rHUA5SerSfxKahtS2OvOth2AeYXw3B3rEHn5OB0ApvqJn7rAjTHHpQ9uehThDxPet0wIGTkK5tj8mKf2hJ_fCBZvaqt4avj7vHAqYZqw2bA67YE-oQYyvbCyxst69FUi6HP1Cq8Wc1woAnbjXwF4ewcOsMBNE0uXFuJbWVjtAdE66vCsHRYDRgFIWKkWOcdsTaSeHmHh7sFluNPaHmUBho";

const ALL_PRODUCTS = [
  { id: 1, name: "Standard Tee 01", price: 140, category: "T-Shirts & Polos", colors: ["#1a1c1c", "#e2e2e2", "#474747"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzepO1PY2mkVaxJm16W-wLf6e21SJrNH-HRK5-bjWDemKkhmTWId48tm1pNGiMRz4T9DoFy7tuIdawCabs2Gtzbc3uFxs7ae0NVoLu8DAegk5VA6rGEj9avBdKdms07L2S-DX9C11Noe9sEZYcRd7BELVfElExM6a1GZUAklnrDZLF2kmVzJsgND6WMA8Tiwge6i71vI6VhSWoSaLIXHc3BE9jMv7WrNQbC0J90LxEOcHSVoTifmTkiCYEVD1RJK6XcicepacuO58" },
  { id: 2, name: "Pleated Trouser", price: 320, category: "Trousers", colors: ["#1a1c1c", "#dadada"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1jUG0_fQr9jxh4KFSbx3iWvhI9zkG08RR7FwxRvS0-C6Epu9-5CtuBuIomCEinKlhAPxpw_ewt08IeoWDXl5T0Sklhe04O7OC2Vwun0To0gECdyCDCZlUtJbu-uIY3khE3wVSHiDDyIN_yGe9NYKeryiOjckTAC-6YCrBEFVKKp8dyiHNuDcH2zYvLBNy3s554TbHQMC_muLpc4IKs7jS9ej8CjHyZduEB46vDt1rfL-1Qau6iXC2uuu-NK74xs-9ZEv_0cFza2Y" },
  { id: 3, name: "Monolith Coat", price: 890, category: "Coats & Jackets", colors: ["#1a1c1c"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUQDUkpjnSg4sYPM2oy0kEXqmYfAWVH-3uL2g24yxdbXI6_5PTerYIhjOxqHCxZc31_1KE4P6vJwx3KDiDcRVSsGM5m2BYxZGESNOeD8AahuxI8GpQk2www7DLdsureVKFc-UtnxYiztqor5yL7chjoqnFg3-PV4S0Xy_xIrWVfl5YwJjnLAAW_ezj4LitbuaAyYXSUsGFMw_HIf_mMS60FVVtu91WehuSWm71l_6ef-VkJvUnmFxYBIgnSkpLVY3htBTu7_OX2Es" },
  { id: 4, name: "Cashmere Rib", price: 450, category: "Hoodies & Sweaters", colors: ["#ffffff", "#1a1c1c"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIVU7W6nlWMmJitD1goPYpKj1tMox1525R0k2e6kJzY-bxSYkxRyxzD7l8PnKd-CUGa8oMaBCXVoXBNMjGq3m6JJ5X8lhkGbuFCBca3l24-VOCt1ZfIfzq3c6hFjtBInulklHr6ivTouNJDFffl37jm1128xQDWkHhwleDf75QsruUboiimTs6I7PvYUQIGZ3j9e559DJcgng73t2ZcBPsoGVUL1RdbkUjJwue2fE4G_bwbU2AR9xSDaWkcS_bArAvxG61MBR79WI" },
  { id: 5, name: "Essential Pack", price: 280, category: "Shirts", colors: ["#1a1c1c"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuACl0MD03-ydVHwc_XLE063tRs48HokVkeeSVRuEGpfLaWfOE_qEVT1eizEDQ5qh-zy6En9a5NSkopQqvl4Bo6VnEZjG50oIdVSpFowORJUkxsiuYYE8jQL_cOaY-uqdYGGlGmfQ6Ji-QF_gvphXbSOjLtmmI5QVq8Yk2lETFG-rudcYvFLt3PSzqnIRI4kdleODgMRDVBUz_sA0pbd9FjbidMmqB0Jo1RtgTRfOzw10NrVJhaeNinyL4fGt9xukerYDJq_sqOIXuU" },
  { id: 6, name: "Void Shirt", price: 195, category: "Shirts", colors: ["#1a1c1c", "#474747"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcI9AESSiLaf-3fkmseHulnyShuvWFXaB6a_4kJfJv4dmdF-FEblBxjkF0fwllzizVokqL2CDmptiezp33XCmViV2m-bfZ8-zZnJOkhOtKkmhO1WZfxnE_dMjTE5oS2mevAkROztmLPPPmjl8wM1-H0JA35iEUhU5ps-qsiZbH15IZMSZhTA-K3WIJEEgUCXjwDk-lCZ6X5Gz9qttZ5_D4o0MfXuQ2Bzh7D_SlDVaLAc5Ysl0On-kd9fWw6b5I9WIawg3PBcTgF54" },
  { id: 7, name: "Wide Sculpt Pant", price: 380, category: "Trousers", colors: ["#1b1c1c"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHwLhq-Cp-d4jqcUwvuJUWCYEvo2awii2JeMfQBF9iWR_R5rN9de5fs63TVgzFqdnm_dgZcUOAxRPtd_7WVU3AG_Fe8Xxd1JOiM0OXaSIglPLTKeyCuw6PN-aj2sSiU2X12cuLUWNMrYIJCfvyjb2OKTY_Li_0VxzjOsRcC5Wv0XyUEbVw4rz2QqiP1gmMc_qjhduFGPitniQZZRh8eT-aLApP8QdoKtJXP8bJHxBCJpPLjzJgcDlcy1QP9nKtDTjmYWHyvthrX9g" },
  { id: 8, name: "Oversize Knit", price: 310, category: "Hoodies & Sweaters", colors: ["#474747", "#1a1c1c"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqD9DvAw49AMryUflMUPWvrWzyybWHT6M3Ykop37fp1cZns9fNQnqW1X3yroo28tUFLHxIMG7KowkBjjdOcTHB1NRPULS6RddUaqYAdl77sKYX25l8GjHDqFEde5KPvf-4nwksVwnskPXUE_uPfBgfostF-wbJR2fac_68s-nPABXD0CG4X-e1_i6xajW_E--9jQbZNyMHduED6XHOiQbRieVkCMU4zpGcUAmLM5homCFw-p7ksNcyaRWBgvxpj25vJ8qBCwQJkJY" },
  { id: 9, name: "Linen Shirt 02", price: 220, category: "Shirts", colors: ["#e2e2e2", "#1a1c1c"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzepO1PY2mkVaxJm16W-wLf6e21SJrNH-HRK5-bjWDemKkhmTWId48tm1pNGiMRz4T9DoFy7tuIdawCabs2Gtzbc3uFxs7ae0NVoLu8DAegk5VA6rGEj9avBdKdms07L2S-DX9C11Noe9sEZYcRd7BELVfElExM6a1GZUAklnrDZLF2kmVzJsgND6WMA8Tiwge6i71vI6VhSWoSaLIXHc3BE9jMv7WrNQbC0J90LxEOcHSVoTifmTkiCYEVD1RJK6XcicepacuO58" },
  { id: 10, name: "Minimal Polo", price: 175, category: "T-Shirts & Polos", colors: ["#ffffff", "#474747"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIVU7W6nlWMmJitD1goPYpKj1tMox1525R0k2e6kJzY-bxSYkxRyxzD7l8PnKd-CUGa8oMaBCXVoXBNMjGq3m6JJ5X8lhkGbuFCBca3l24-VOCt1ZfIfzq3c6hFjtBInulklHr6ivTouNJDFffl37jm1128xQDWkHhwleDf75QsruUboiimTs6I7PvYUQIGZ3j9e559DJcgng73t2ZcBPsoGVUL1RdbkUjJwue2fE4G_bwbU2AR9xSDaWkcS_bArAvxG61MBR79WI" },
  { id: 11, name: "Arch Bomber", price: 620, category: "Coats & Jackets", colors: ["#1a1c1c", "#474747"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUQDUkpjnSg4sYPM2oy0kEXqmYfAWVH-3uL2g24yxdbXI6_5PTerYIhjOxqHCxZc31_1KE4P6vJwx3KDiDcRVSsGM5m2BYxZGESNOeD8AahuxI8GpQk2www7DLdsureVKFc-UtnxYiztqor5yL7chjoqnFg3-PV4S0Xy_xIrWVfl5YwJjnLAAW_ezj4LitbuaAyYXSUsGFMw_HIf_mMS60FVVtu91WehuSWm71l_6ef-VkJvUnmFxYBIgnSkpLVY3htBTu7_OX2Es" },
  { id: 12, name: "Void Hoodie", price: 340, category: "Hoodies & Sweaters", colors: ["#1a1c1c"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqD9DvAw49AMryUflMUPWvrWzyybWHT6M3Ykop37fp1cZns9fNQnqW1X3yroo28tUFLHxIMG7KowkBjjdOcTHB1NRPULS6RddUaqYAdl77sKYX25l8GjHDqFEde5KPvf-4nwksVwnskPXUE_uPfBgfostF-wbJR2fac_68s-nPABXD0CG4X-e1_i6xajW_E--9jQbZNyMHduED6XHOiQbRieVkCMU4zpGcUAmLM5homCFw-p7ksNcyaRWBgvxpj25vJ8qBCwQJkJY" },
];

const CATEGORIES = ["All Items", "Shirts", "T-Shirts & Polos", "Hoodies & Sweaters", "Coats & Jackets", "Trousers"];
const SORT_OPTIONS = ["Default", "Price: Low to High", "Price: High to Low", "Name A-Z"];
const LANGUAGE_OPTIONS = ["English", "Azerbaijani", "Russian"];
const ITEMS_PER_PAGE = 8;

function fmt(price) {
  return `$${price}`;
}

function Toast({ messages }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 32,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      {messages.map((message) => (
        <div
          key={message.id}
          style={{
            background: "#000",
            color: "#fff",
            padding: "12px 24px",
            fontFamily: "'Manrope', sans-serif",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            animation: "fadeInUp 0.3s ease",
          }}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
}

function SearchModal({ open, onClose, onAddToCart }) {
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
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: 80,
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          background: "#fff",
          width: "min(640px, 94vw)",
          maxHeight: "70vh",
          overflowY: "auto",
          boxShadow: "0 32px 80px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "20px 24px",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
          }}
        >
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
            <button onClick={() => setQuery("")} style={{ display: "flex", color: "#999" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                close
              </span>
            </button>
          )}
        </div>

        {query.trim() ? (
          <div>
            {results.length === 0 ? (
              <div
                style={{
                  padding: "32px 24px",
                  textAlign: "center",
                  color: "#999",
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                No results for "{query}"
              </div>
            ) : (
              results.map((product) => (
                <div
                  key={product.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "12px 24px",
                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.background = "#f9f9f9";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.background = "transparent";
                  }}
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    style={{ width: 52, height: 68, objectFit: "cover", filter: "grayscale(1)", flexShrink: 0 }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {product.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 10,
                        color: "#999",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        marginTop: 4,
                      }}
                    >
                      {product.category}
                    </div>
                  </div>
                  <span style={{ fontFamily: "'Noto Serif', serif", fontStyle: "italic", fontSize: 13 }}>
                    {fmt(product.price)}
                  </span>
                  <button
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
                  </button>
                </div>
              ))
            )}
          </div>
        ) : (
          <div style={{ padding: 24, display: "flex", flexWrap: "wrap", gap: 8 }}>
            <div
              style={{
                width: "100%",
                fontFamily: "'Manrope', sans-serif",
                fontSize: 9,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#999",
                marginBottom: 8,
              }}
            >
              Popular categories
            </div>
            {CATEGORIES.slice(1).map((category) => (
              <button
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
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CartDrawer({ open, onClose, items, onRemove, onQtyChange }) {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {open && <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 190, background: "rgba(0,0,0,0.4)" }} />}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 195,
          width: "min(440px, 100vw)",
          background: "#fff",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
          display: "flex",
          flexDirection: "column",
          boxShadow: open ? "-24px 0 80px rgba(0,0,0,0.15)" : "none",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 28px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: "0.25em", textTransform: "uppercase" }}>
            Cart {items.length > 0 && `(${items.reduce((sum, item) => sum + item.qty, 0)})`}
          </span>
          <button onClick={onClose} style={{ display: "flex" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              close
            </span>
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 28px" }}>
          {items.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: 16,
                color: "#aaa",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 48, opacity: 0.3 }}>
                shopping_bag
              </span>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                Your cart is empty
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} style={{ display: "flex", gap: 16, padding: "20px 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <img src={item.img} alt={item.name} style={{ width: 72, height: 96, objectFit: "cover", filter: "grayscale(1)", flexShrink: 0 }} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {item.name}
                  </div>
                  <div style={{ fontFamily: "'Noto Serif', serif", fontStyle: "italic", fontSize: 13 }}>{fmt(item.price)}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
                    <button
                      onClick={() => onQtyChange(item.id, -1)}
                      style={{ width: 28, height: 28, border: "1px solid rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}
                    >
                      -
                    </button>
                    <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 12, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                    <button
                      onClick={() => onQtyChange(item.id, 1)}
                      style={{ width: 28, height: 28, border: "1px solid rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}
                    >
                      +
                    </button>
                    <button onClick={() => onRemove(item.id)} style={{ marginLeft: "auto", display: "flex", color: "#aaa" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div style={{ padding: "24px 28px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#777" }}>Total</span>
              <span style={{ fontFamily: "'Noto Serif', serif", fontStyle: "italic", fontSize: 16 }}>{fmt(total)}</span>
            </div>
            <button
              style={{
                width: "100%",
                background: "#000",
                color: "#fff",
                padding: 16,
                fontFamily: "'Manrope', sans-serif",
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function InputField({ label, type, value, onChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <label
        style={{
          position: "absolute",
          top: focused || value ? -8 : 12,
          left: 0,
          transition: "all 0.2s",
          pointerEvents: "none",
          fontFamily: "'Manrope', sans-serif",
          fontSize: focused || value ? 8 : 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: focused ? "#000" : "#aaa",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          border: "none",
          borderBottom: `1px solid ${focused ? "#000" : "rgba(0,0,0,0.15)"}`,
          outline: "none",
          padding: "14px 0 8px",
          background: "transparent",
          fontFamily: "'Manrope', sans-serif",
          fontSize: 13,
          color: "#000",
        }}
      />
    </div>
  );
}

function UserModal({ open, onClose }) {
  const [tab, setTab] = useState("signin");
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) {
      setForm({ email: "", password: "", name: "" });
      setSubmitted(false);
    }
  }, [open]);

  const handleSubmit = () => {
    if (!form.email || !form.password) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  if (!open) return null;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={(event) => event.stopPropagation()} style={{ background: "#fff", width: "min(420px, 94vw)", padding: "40px 40px 36px" }}>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 48, color: "#000" }}>
              check_circle
            </span>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 16 }}>
              {tab === "signin" ? "Welcome back." : "Account created."}
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                {tab === "signin" ? "Sign In" : "Create Account"}
              </div>
              <button onClick={onClose} style={{ display: "flex" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                  close
                </span>
              </button>
            </div>

            <div style={{ display: "flex", gap: 0, marginBottom: 28, borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              {["signin", "register"].map((value) => (
                <button
                  key={value}
                  onClick={() => setTab(value)}
                  style={{
                    flex: 1,
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    paddingBottom: 12,
                    color: tab === value ? "#000" : "#aaa",
                    borderBottom: tab === value ? "2px solid #000" : "2px solid transparent",
                    marginBottom: -1,
                  }}
                >
                  {value === "signin" ? "Sign In" : "Register"}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {tab === "register" && (
                <InputField label="Full Name" type="text" value={form.name} onChange={(name) => setForm((current) => ({ ...current, name }))} />
              )}
              <InputField label="Email Address" type="email" value={form.email} onChange={(email) => setForm((current) => ({ ...current, email }))} />
              <InputField label="Password" type="password" value={form.password} onChange={(password) => setForm((current) => ({ ...current, password }))} />
            </div>

            <button
              onClick={handleSubmit}
              style={{
                marginTop: 28,
                width: "100%",
                background: "#000",
                color: "#fff",
                padding: 14,
                fontFamily: "'Manrope', sans-serif",
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              {tab === "signin" ? "Sign In" : "Create Account"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Dropdown({ label, options, value, onChange, primary }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="dropdown" style={{ position: "relative" }}>
      <button
        className="dropdown-trigger"
        onClick={() => setOpen((current) => !current)}
        style={{
          background: primary ? "#000" : "transparent",
          color: primary ? "#fff" : "#000",
          border: primary ? "none" : "1px solid rgba(0,0,0,0.15)",
          padding: "8px 20px",
          fontFamily: "'Manrope', sans-serif",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {value || label}
        <span className="material-symbols-outlined" style={{ fontSize: 14, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
          expand_more
        </span>
      </button>
      {open && (
        <div
          className="dropdown-menu"
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.1)",
            zIndex: 50,
            minWidth: 200,
            boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
          }}
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "10px 16px",
                background: value === option ? "#f3f3f3" : "transparent",
                fontFamily: "'Manrope', sans-serif",
                fontSize: 10,
                fontWeight: value === option ? 700 : 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#000",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = "#f9f9f9";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = value === option ? "#f3f3f3" : "transparent";
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductCard({ product, onAddToCart }) {
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
          <span style={{ fontFamily: "'Noto Serif', serif", fontStyle: "italic", fontSize: 13 }}>{fmt(product.price)}</span>
        </div>
        <div className="color-row" style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {product.colors.map((color, index) => (
            <div
              key={color}
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

function Navbar({ activeNav, setActiveNav, activeLang, setActiveLang, cartCount, onSearch, onCart, onUser }) {
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) setLangOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="topbar" style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(249,249,249,0.97)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <div className="topbar-inner" style={{ width: "100%", maxWidth: 1440, margin: "0 auto" }}>
        <div className="topbar-top-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, paddingBottom: 10 }}>
          <div className="brand-row" style={{ display: "flex", alignItems: "center", gap: 40, minWidth: 0 }}>
            <a href="#" className="brand" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", flexShrink: 0 }}>
              <span className="brand-name" style={{ fontFamily: "'Manrope', sans-serif", fontSize: 20, fontWeight: 900, letterSpacing: "-0.04em", color: "#000", textTransform: "uppercase" }}>
                GADIRONI
              </span>
            </a>
            <nav className="nav-links" style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
              {CATEGORIES.slice(1).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveNav(category)}
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: activeNav === category ? "#000" : "#aaa",
                    borderBottom: activeNav === category ? "1px solid #000" : "1px solid transparent",
                    paddingBottom: 2,
                    transition: "color 0.2s",
                  }}
                >
                  {category}
                </button>
              ))}
            </nav>
          </div>

          <div className="lang-selector" style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
            <div ref={langRef} style={{ position: "relative" }}>
              <button
                className="lang-button"
                onClick={() => setLangOpen((current) => !current)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 999,
                  padding: "6px 14px",
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#333",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                  language
                </span>
                {activeLang.slice(0, 2).toUpperCase()}
                <span className="material-symbols-outlined" style={{ fontSize: 12 }}>
                  expand_more
                </span>
              </button>
              {langOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, boxShadow: "0 16px 40px rgba(0,0,0,0.1)", minWidth: 160, overflow: "hidden", zIndex: 200 }}>
                  {LANGUAGE_OPTIONS.map((language) => (
                    <button
                      key={language}
                      onClick={() => {
                        setActiveLang(language);
                        setLangOpen(false);
                      }}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "10px 16px",
                        background: activeLang === language ? "#f3f3f3" : "transparent",
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 11,
                        fontWeight: activeLang === language ? 700 : 500,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#000",
                      }}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="icon-actions" style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button onClick={onSearch} title="Search" style={{ display: "flex", opacity: 0.65 }} onMouseEnter={(event) => { event.currentTarget.style.opacity = 1; }} onMouseLeave={(event) => { event.currentTarget.style.opacity = 0.65; }}>
                <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
                  search
                </span>
              </button>
              <button onClick={onUser} title="Account" style={{ display: "flex", opacity: 0.65 }} onMouseEnter={(event) => { event.currentTarget.style.opacity = 1; }} onMouseLeave={(event) => { event.currentTarget.style.opacity = 0.65; }}>
                <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
                  person
                </span>
              </button>
              <button onClick={onCart} title="Cart" style={{ display: "flex", position: "relative", opacity: 0.65 }} onMouseEnter={(event) => { event.currentTarget.style.opacity = 1; }} onMouseLeave={(event) => { event.currentTarget.style.opacity = 0.65; }}>
                <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
                  shopping_bag
                </span>
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: -6,
                      right: -6,
                      background: "#000",
                      color: "#fff",
                      borderRadius: "50%",
                      width: 16,
                      height: 16,
                      fontSize: 9,
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 800,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="topbar-divider" />
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-section" style={{ position: "relative", height: 480, display: "flex", alignItems: "flex-end", overflow: "hidden", padding: "0 32px 40px" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <img className="hero-bg" src={HERO_IMG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1)", opacity: 0.9 }} />
        <div className="hero-overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }} />
      </div>
      <div className="hero-content" style={{ position: "relative", zIndex: 2, width: "min(1440px, 100%)", margin: "0 auto", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
        <h1 className="hero-title" style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(48px, 7vw, 80px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", textTransform: "uppercase", lineHeight: 1, margin: 0 }}>
          Essential
          <br />
          Monolith
        </h1>
        <p className="hero-copy" style={{ color: "#fff", fontSize: 13, lineHeight: 1.7, fontStyle: "italic", opacity: 0.85, maxWidth: 320, fontFamily: "'Noto Serif', serif", margin: 0 }}>
          A curation of structural silhouettes and architectural textiles. Designed for the modern observer who finds beauty in the void.
        </p>
      </div>
    </section>
  );
}

function ProductGrid({ activeNav, onAddToCart }) {
  const [category, setCategory] = useState("All Items");
  const [sort, setSort] = useState("Default");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [activeNav, category]);

  let filtered = ALL_PRODUCTS;
  const filterCategory = activeNav !== "All Items" ? activeNav : category !== "All Items" ? category : null;

  if (filterCategory) {
    filtered = filtered.filter((product) => product.category === filterCategory);
  }

  if (sort === "Price: Low to High") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "Price: High to Low") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === "Name A-Z") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const start = filtered.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(page * ITEMS_PER_PAGE, filtered.length);

  return (
    <section className="product-section" style={{ padding: "56px 32px", background: "#f3f3f4" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>
        <div className="filters-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 24, borderBottom: "1px solid rgba(0,0,0,0.1)", flexWrap: "wrap", gap: 12 }}>
          <div className="filter-buttons" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Dropdown label="All Items" options={CATEGORIES} value={category} onChange={(value) => { setCategory(value); setPage(1); }} primary />
            <Dropdown label="Sort by" options={SORT_OPTIONS} value={sort === "Default" ? null : sort} onChange={setSort} />
          </div>
          <span className="result-count" style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 500, color: "#5f5e5e" }}>
            {filtered.length === 0
              ? "No items"
              : `Showing ${String(start).padStart(2, "0")} - ${String(end).padStart(2, "0")} of ${String(filtered.length).padStart(2, "0")}`}
          </span>
        </div>

        {paginated.length > 0 ? (
          <div className="product-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 1, background: "rgba(0,0,0,0.08)" }}>
            {paginated.map((product) => (
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
      </div>
    </section>
  );
}

function Newsletter({ onToast }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = () => {
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setDone(true);
    onToast("You're subscribed. Welcome to the Journal.");
    setEmail("");
    setTimeout(() => setDone(false), 3000);
  };

  return (
    <section className="newsletter-section" style={{ background: "#000", padding: "80px 32px", overflow: "hidden", position: "relative" }}>
      <div className="newsletter-content" style={{ maxWidth: 1440, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48 }}>
        <div className="newsletter-copy" style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 560 }}>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", textTransform: "uppercase", lineHeight: 1, margin: 0 }}>
            The Monolith Journal
          </h2>
          <p style={{ fontFamily: "'Noto Serif', serif", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, fontStyle: "italic", margin: 0 }}>
            Receive exclusive access to new architectural releases and seasonal editorials. No noise. Just the essential.
          </p>

          {done ? (
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#fff", display: "flex", alignItems: "center", gap: 10 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#6fffb0" }}>
                check_circle
              </span>
              Subscribed successfully.
            </div>
          ) : (
            <div className="newsletter-form" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleSubscribe();
                }}
                placeholder="ENTER YOUR EMAIL"
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: `1px solid ${error ? "#ff6b6b" : "rgba(255,255,255,0.25)"}`,
                  color: "#fff",
                  padding: "12px 0",
                  outline: "none",
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  width: "min(100%, 420px)",
                }}
              />
              {error && <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 9, color: "#ff6b6b", letterSpacing: "0.15em" }}>{error}</span>}
              <button onClick={handleSubscribe} style={{ alignSelf: "flex-start", color: "#fff", borderBottom: "1px solid #fff", fontFamily: "'Manrope', sans-serif", fontSize: 10, fontWeight: 900, letterSpacing: "0.3em", textTransform: "uppercase", paddingBottom: 2, marginTop: 4 }}>
                Subscribe -
              </button>
            </div>
          )}
        </div>
        <div className="newsletter-image-wrap" style={{ flexShrink: 0, width: 288 }}>
          <img src={NEWSLETTER_IMG} alt="" style={{ width: "100%", filter: "grayscale(1)", opacity: 0.4, transform: "translate(32px, 32px)" }} />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" style={{ background: "#000", color: "#fff", padding: "56px 32px" }}>
      <div className="footer-top" style={{ maxWidth: 1440, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 280 }}>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 18, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.03em" }}>GADIRONI</span>
          <p style={{ fontFamily: "'Noto Serif', serif", fontStyle: "italic", fontSize: 12, color: "#777", lineHeight: 1.8, margin: 0 }}>
            Elevating the garment to its architectural peak. Minimalist intent, maximum structural integrity.
          </p>
        </div>
        <div className="footer-links" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
          {[
            { title: "Discover", links: ["Collection", "Editorial", "Archive"] },
            { title: "Company", links: ["Sustainability", "Legal"] },
            { title: "Connect", links: ["Instagram", "Twitter"] },
          ].map((column) => (
            <div key={column.title} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, color: "#fff" }}>{column.title}</span>
              {column.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#777", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.color = "#777";
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom" style={{ maxWidth: 1440, margin: "32px auto 0", paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555" }}>
          (c) 2024 GADIRONI. THE ARCHITECTURAL MONOLITH.
        </span>
        <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555" }}>
          01 - 48
        </span>
      </div>
    </footer>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("All Items");
  const [activeLang, setActiveLang] = useState("English");
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const addToast = (text) => {
    const id = Date.now();
    setToasts((current) => [...current, { id, text }]);
    setTimeout(() => {
      setToasts((current) => current.filter((message) => message.id !== id));
    }, 2500);
  };

  const handleAddToCart = (product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...current, { ...product, qty: 1 }];
    });
    addToast(`${product.name} added to cart`);
  };

  const handleRemove = (id) => {
    setCartItems((current) => current.filter((item) => item.id !== id));
  };

  const handleQtyChange = (id, delta) => {
    setCartItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
      <div style={{ background: "#f9f9f9", minHeight: "100vh", fontFamily: "'Manrope', sans-serif" }}>
        <Navbar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          activeLang={activeLang}
          setActiveLang={setActiveLang}
          cartCount={cartCount}
          onSearch={() => setSearchOpen(true)}
          onCart={() => setCartOpen(true)}
          onUser={() => setUserOpen(true)}
        />
        <main>
          <Hero />
          <ProductGrid activeNav={activeNav} onAddToCart={handleAddToCart} />
          <Newsletter onToast={addToast} />
        </main>
        <Footer />
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} onAddToCart={handleAddToCart} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cartItems} onRemove={handleRemove} onQtyChange={handleQtyChange} />
      <UserModal open={userOpen} onClose={() => setUserOpen(false)} />
      <Toast messages={toasts} />
    </>
  );
}
