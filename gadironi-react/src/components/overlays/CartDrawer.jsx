import { formatPrice } from "../../data/products";
import { useI18n } from "../../i18n";
import Button from "../common/Button";

export default function CartDrawer({ open, onClose, items, onRemove, onQtyChange }) {
  const { t } = useI18n();
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
            {t("cart.title")} {items.length > 0 && `(${items.reduce((sum, item) => sum + item.qty, 0)})`}
          </span>
          <Button onClick={onClose} style={{ display: "flex" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              close
            </span>
          </Button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 28px" }}>
          {items.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16, color: "#aaa" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 48, opacity: 0.3 }}>
                shopping_bag
              </span>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase" }}>
                {t("cart.empty")}
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} style={{ display: "flex", gap: 16, padding: "20px 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <img src={item.img} alt={item.name} style={{ width: 72, height: 96, objectFit: "cover", filter: "grayscale(1)", flexShrink: 0 }} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>{item.name}</div>
                  <div style={{ fontFamily: "'Noto Serif', serif", fontStyle: "italic", fontSize: 13 }}>{formatPrice(item.price)}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
                    <Button onClick={() => onQtyChange(item.id, -1)} style={{ width: 28, height: 28, border: "1px solid rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                      -
                    </Button>
                    <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 12, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                    <Button onClick={() => onQtyChange(item.id, 1)} style={{ width: 28, height: 28, border: "1px solid rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                      +
                    </Button>
                    <Button onClick={() => onRemove(item.id)} style={{ marginLeft: "auto", display: "flex", color: "#aaa" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                        delete
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div style={{ padding: "24px 28px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#777" }}>{t("cart.total")}</span>
              <span style={{ fontFamily: "'Noto Serif', serif", fontStyle: "italic", fontSize: 16 }}>{formatPrice(total)}</span>
            </div>
            <Button
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
              {t("cart.checkout")}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
