export default function Container({ children, className = "", style = {} }) {
  return (
    <div className={className} style={{ maxWidth: 1440, margin: "0 auto", ...style }}>
      {children}
    </div>
  );
}
