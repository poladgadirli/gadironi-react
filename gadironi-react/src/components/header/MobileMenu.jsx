import { useEffect, useState } from "react";
import { useI18n } from "../../i18n";
import "./MobileMenu.css";

export default function MobileMenu({ categories, activeNav, setActiveNav }) {
  const [open, setOpen] = useState(false);
  const { getCategoryLabel, t } = useI18n();

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    if (open && window.innerWidth <= 768) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [open]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {!open && (
        <button
          type="button"
          className="mobile-menu-button"
          aria-label={t("mobileMenu.open")}
          aria-expanded={false}
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      )}

      <div
        className={`mobile-menu-backdrop${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <aside className={`mobile-menu-panel${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">{t("mobileMenu.title")}</span>
          <button
            type="button"
            className="mobile-menu-close"
            aria-label={t("mobileMenu.close")}
            onClick={() => setOpen(false)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              close
            </span>
          </button>
        </div>

        <nav className="mobile-menu-nav" aria-label={t("mobileMenu.navigation")}>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`mobile-menu-link${activeNav === category ? " is-active" : ""}`}
              onClick={() => {
                setActiveNav(category);
                setOpen(false);
              }}
            >
              {getCategoryLabel(category)}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
