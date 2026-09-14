export default function Button({ children, variant = "primary", block = false, ...props }) {
  return (
    <button className={`btn btn-${variant} ${block ? "btn-block" : ""}`} {...props}>
      {children}
    </button>
  );
}
