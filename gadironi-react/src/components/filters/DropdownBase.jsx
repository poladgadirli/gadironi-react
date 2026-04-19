import { useEffect, useRef, useState } from "react";
import "./Dropdown.css";

export default function DropdownBase({ label, options, value, onChange, primary = false }) {
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
