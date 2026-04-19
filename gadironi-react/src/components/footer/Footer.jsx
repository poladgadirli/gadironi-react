import Container from "../common/Container";
import "./Footer.css";

const FOOTER_COLUMNS = [
  { title: "Discover", links: ["Collection", "Editorial", "Archive"] },
  { title: "Company", links: ["Sustainability", "Legal"] },
  { title: "Connect", links: ["Instagram", "Twitter"] },
];

export default function Footer() {
  return (
    <footer className="site-footer" style={{ background: "#000", color: "#fff", padding: "56px 32px" }}>
      <Container className="footer-top" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 280 }}>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 18, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.03em" }}>GADIRONI</span>
          <p style={{ fontFamily: "'Noto Serif', serif", fontStyle: "italic", fontSize: 12, color: "#777", lineHeight: 1.8, margin: 0 }}>
            Elevating the garment to its architectural peak. Minimalist intent, maximum structural integrity.
          </p>
        </div>
        <div className="footer-links" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
          {FOOTER_COLUMNS.map((column) => (
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
      </Container>
      <Container className="footer-bottom" style={{ marginTop: 32, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555" }}>
          (c) 2024 GADIRONI. THE ARCHITECTURAL MONOLITH.
        </span>
        <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555" }}>
          01 - 48
        </span>
      </Container>
    </footer>
  );
}
