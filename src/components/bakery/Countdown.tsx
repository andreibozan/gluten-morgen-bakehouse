import { useEffect, useState } from "react";
import { BAKE_HOUR } from "./data";

/** Milliseconds until the next bake at BAKE_HOUR, Europe/Bucharest time. */
function msToNextBake(): number | null {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Bucharest",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date());
    const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
    const secs = get("hour") * 3600 + get("minute") * 60 + get("second");
    if (!Number.isFinite(secs)) return null;
    const day = 86_400;
    return (((BAKE_HOUR * 3600 - secs) % day) + day) % day * 1000 || day * 1000;
  } catch {
    return null;
  }
}

export function Countdown({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [left, setLeft] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const tick = () => {
      const v = msToNextBake();
      if (v === null) setFailed(true);
      else setLeft(v);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const base = tone === "dark" ? "text-foreground" : "text-primary-foreground";
  if (failed) return <a href="#program" className={`text-sm underline ${base}`}>Vezi programul săptămânal</a>;
  if (left === null) return <div className="h-8" aria-hidden="true" />;

  const pad = (n: number) => String(n).padStart(2, "0");
  const h = pad(Math.floor(left / 3_600_000));
  const m = pad(Math.floor((left % 3_600_000) / 60_000));
  const s = pad(Math.floor((left % 60_000) / 1000));

  return (
    <div className={`flex items-center gap-3 ${base}`}>
      <span className="eyebrow" style={{ color: "currentColor" }}>Următoarea coacere în</span>
      <span className="font-display text-2xl tabular-nums tracking-wide" aria-live="off">
        {h}:{m}:{s}
      </span>
    </div>
  );
}
