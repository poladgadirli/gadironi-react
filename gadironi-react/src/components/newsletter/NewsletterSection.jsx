import { useState } from "react";
import { NEWSLETTER_IMG } from "../../data/products";
import { useI18n } from "../../i18n";
import Container from "../common/Container";
import "./NewsletterSection.css";

export default function NewsletterSection({ onToast }) {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = () => {
    if (!email.trim()) {
      setError(t("newsletter.errorMissingEmail"));
      return;
    }

    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setError(t("newsletter.errorInvalidEmail"));
      return;
    }

    setError("");
    setDone(true);
    onToast(t("newsletter.toastSuccess"));
    setEmail("");
    setTimeout(() => setDone(false), 3000);
  };

  return (
    <section className="newsletter-section" style={{ background: "#000", padding: "80px 32px", overflow: "hidden", position: "relative" }}>
      <Container className="newsletter-content" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48 }}>
        <div className="newsletter-copy" style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 560 }}>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", textTransform: "uppercase", lineHeight: 1, margin: 0 }}>
            {t("newsletter.title")}
          </h2>
          <p style={{ fontFamily: "'Noto Serif', serif", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, fontStyle: "italic", margin: 0 }}>
            {t("newsletter.copy")}
          </p>

          {done ? (
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#fff", display: "flex", alignItems: "center", gap: 10 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#6fffb0" }}>
                check_circle
              </span>
              {t("newsletter.successInline")}
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
                placeholder={t("newsletter.placeholder")}
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
                {t("newsletter.subscribe")}
              </button>
            </div>
          )}
        </div>
        <div className="newsletter-image-wrap" style={{ flexShrink: 0, width: 288 }}>
          <img src={NEWSLETTER_IMG} alt="" style={{ width: "100%", filter: "grayscale(1)", opacity: 0.4, transform: "translate(32px, 32px)" }} />
        </div>
      </Container>
    </section>
  );
}
