export function Button({ children, className, onClick, variant }) {
  const base = "px-4 py-2 rounded-lg font-semibold transition-all duration-200";
  const styles =
    variant === "outline"
      ? "border border-blue-400 text-blue-300 hover:bg-blue-950/40 hover:text-white"
      : "bg-gradient-to-r from-blue-500 to-emerald-400 text-white hover:scale-105";

  return (
    <button
      onClick={onClick}
      className={`${base} ${styles} ${className || ""}`}
    >
      {children}
    </button>
  );
}
