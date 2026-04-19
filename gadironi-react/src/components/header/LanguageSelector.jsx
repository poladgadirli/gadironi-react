import { useEffect, useRef, useState } from "react";
import { LANGUAGE_OPTIONS, useI18n, useLanguage } from "../../i18n";
import "./LanguageSelector.css";

export default function LanguageSelector() {
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const { t } = useI18n();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handler = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) setLangOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={langRef} className="language-selector-wrap" style={{ position: "relative" }}>
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
        {language.toUpperCase()}
        <span className="material-symbols-outlined" style={{ fontSize: 12 }}>
          expand_more
        </span>
      </button>
      {langOpen && (
        <div
          className="language-menu"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: 8,
            boxShadow: "0 16px 40px rgba(0,0,0,0.1)",
            minWidth: 160,
            overflow: "hidden",
            zIndex: 200,
          }}
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => {
                setLanguage(option);
                setLangOpen(false);
              }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "10px 16px",
                background: language === option ? "#f3f3f3" : "transparent",
                fontFamily: "'Manrope', sans-serif",
                fontSize: 11,
                fontWeight: language === option ? 700 : 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#000",
              }}
            >
              {t(`languages.${option}`)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
