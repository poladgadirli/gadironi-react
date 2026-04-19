import { HERO_IMG } from "../../data/products";
import { useI18n } from "../../i18n";
import Container from "../common/Container";
import "./HeroSection.css";

export default function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="hero-section" style={{ position: "relative", height: 480, display: "flex", alignItems: "flex-end", overflow: "hidden", padding: "0 32px 40px" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <img className="hero-bg" src={HERO_IMG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1)", opacity: 0.9 }} />
        <div className="hero-overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }} />
      </div>
      <Container className="hero-content" style={{ position: "relative", zIndex: 2, width: "min(1440px, 100%)", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
        <h1 className="hero-title" style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(48px, 7vw, 80px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", textTransform: "uppercase", lineHeight: 1, margin: 0 }}>
          {t("hero.titleLineOne")}
          <br />
          {t("hero.titleLineTwo")}
        </h1>
        <p className="hero-copy" style={{ color: "#fff", fontSize: 13, lineHeight: 1.7, fontStyle: "italic", opacity: 0.85, maxWidth: 320, fontFamily: "'Noto Serif', serif", margin: 0 }}>
          {t("hero.copy")}
        </p>
      </Container>
    </section>
  );
}
