import Container from "../common/Container";
import { useI18n } from "../../i18n";
import "./Footer.css";

const FOOTER_COLUMNS = [
  { titleKey: "footer.columns.discover", linkKeys: ["footer.links.collection", "footer.links.editorial", "footer.links.archive"] },
  { titleKey: "footer.columns.company", linkKeys: ["footer.links.sustainability", "footer.links.legal"] },
  { titleKey: "footer.columns.connect", linkKeys: ["footer.links.instagram", "footer.links.twitter"] },
];

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="site-footer" style={{ background: "#000", color: "#fff", padding: "56px 32px" }}>
      <Container className="footer-top" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 280 }}>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 18, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.03em" }}>GADIRONI</span>
          <p style={{ fontFamily: "'Noto Serif', serif", fontStyle: "italic", fontSize: 12, color: "#777", lineHeight: 1.8, margin: 0 }}>
            {t("footer.tagline")}
          </p>
        </div>
        <div className="footer-links" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.titleKey} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, color: "#fff" }}>{t(column.titleKey)}</span>
              {column.linkKeys.map((linkKey) => (
                <a
                  key={linkKey}
                  href="#"
                  style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#777", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.color = "#777";
                  }}
                >
                  {t(linkKey)}
                </a>
              ))}
            </div>
          ))}
        </div>
      </Container>
      <Container className="footer-bottom" style={{ marginTop: 32, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555" }}>
          {t("footer.copyright")}
        </span>
        <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555" }}>
          01 - 48
        </span>
      </Container>
    </footer>
  );
}
