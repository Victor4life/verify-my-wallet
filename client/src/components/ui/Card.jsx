export function Card({ children, className }) {
  return (
    <div
      className={`rounded-2xl shadow-lg bg-slate-900/80 border border-white/10 ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className }) {
  return <div className={`p-6 ${className || ""}`}>{children}</div>;
}

export function CardFooter({ children, className }) {
  return (
    <div className={`p-4 border-t border-white/10 ${className || ""}`}>
      {children}
    </div>
  );
}
