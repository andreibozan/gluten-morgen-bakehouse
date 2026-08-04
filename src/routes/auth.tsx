import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Autentificare administrator — Gluten Morgen" },
      { name: "description", content: "Acces pentru echipa brutăriei Gluten Morgen." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (password.length < 8) return setMsg("Parola trebuie să aibă minim 8 caractere.");
    setBusy(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      setBusy(false);
      if (error) return setMsg("Email sau parolă incorecte.");
      navigate({ to: "/admin", replace: true });
    } else {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { emailRedirectTo: window.location.origin + "/admin" },
      });
      setBusy(false);
      if (error) return setMsg(error.message);
      if (data.session) navigate({ to: "/admin", replace: true });
      else setMsg("Verifică emailul pentru confirmarea contului, apoi autentifică-te.");
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-16">
      <Link to="/" className="text-sm text-muted-foreground hover:text-accent">
        ← Înapoi la site
      </Link>
      <p className="eyebrow mt-6">Gluten Morgen</p>
      <h1 className="font-display text-4xl text-primary">
        {mode === "signin" ? "Autentificare" : "Creează contul de administrator"}
      </h1>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <label className="block text-sm">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          Parolă
          <input
            required
            type="password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2"
          />
        </label>
        {msg && <p className="text-sm text-destructive">{msg}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-full bg-primary px-6 py-3 text-primary-foreground disabled:opacity-60"
        >
          {busy ? "Se procesează..." : mode === "signin" ? "Intră în panou" : "Creează cont"}
        </button>
      </form>
      <button
        onClick={() => {
          setMode(mode === "signin" ? "signup" : "signin");
          setMsg(null);
        }}
        className="mt-6 text-sm text-muted-foreground underline"
      >
        {mode === "signin" ? "Nu ai cont? Creează primul cont de administrator" : "Ai deja cont? Autentifică-te"}
      </button>
    </main>
  );
}
