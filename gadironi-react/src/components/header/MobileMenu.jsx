import { useEffect, useState } from "react";
import "./MobileMenu.css";

export default function MobileMenu({ categories, activeNav, setActiveNav }) {
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <button
        type="button"
        className="mobile-menu-button"
        aria-label={open ? "Close category menu" : "Open category menu"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className={`mobile-menu-backdrop${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <aside className={`mobile-menu-panel${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">Categories</span>
          <button
            type="button"
            className="mobile-menu-close"
            aria-label="Close category menu"
            onClick={() => setOpen(false)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              close
            </span>
          </button>
        </div>

        <nav className="mobile-menu-nav" aria-label="Mobile category navigation">
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
              {category}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
