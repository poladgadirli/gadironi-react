import { useState } from "react";

export default function InputField({ label, type, value, onChange }) {
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
