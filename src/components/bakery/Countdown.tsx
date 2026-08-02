import { useEffect, useState } from "react";

function nextBake() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(6, 0, 0, 0);
  if (next.getTime() <= now.getTime()) next.setDate(next.getDate() + 1);
  return next;
}

export function Countdown({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(nextBake().getTime() - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");
  const h = left === null ? "--" : pad(Math.floor(left / 3_600_000));
  const m = left === null ? "--" : pad(Math.floor((left % 3_600_000) / 60_000));
  const s = left === null ? "--" : pad(Math.floor((left % 60_000) / 1000));

  const base = tone === "dark" ? "text-foreground" : "text-primary-foreground";

  return (
    <div className={`flex items-center gap-3 ${base}`}>
      <span className="eyebrow opacity-80" style={{ color: "currentColor" }}>
        Coacem din nou peste
      </span>
      <span
        className="font-display text-2xl tabular-nums tracking-wide"
        aria-live="polite"
        suppressHydrationWarning
      >
        {h}:{m}:{s}
      </span>
    </div>
  );
}
