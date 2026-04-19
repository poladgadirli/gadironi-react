import "./Overlays.css";

export default function Toast({ messages }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 32,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      {messages.map((message) => (
        <div
          key={message.id}
          style={{
            background: "#000",
            color: "#fff",
            padding: "12px 24px",
            fontFamily: "'Manrope', sans-serif",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            animation: "fadeInUp 0.3s ease",
          }}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
}
