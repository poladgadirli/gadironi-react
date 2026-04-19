export default function Button({ children, className = "", style = {}, ...props }) {
  return (
    <button className={className} style={style} {...props}>
      {children}
    </button>
  );
}
