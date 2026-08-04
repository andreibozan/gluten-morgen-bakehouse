import { supabase } from "@/integrations/supabase/client";

export type EventType =
  | "page_view"
  | "product_view"
  | "order_click"
  | "whatsapp_click"
  | "phone_click"
  | "newsletter_signup"
  | "order_submitted";

function sessionId() {
  if (typeof window === "undefined") return null;
  try {
    let id = localStorage.getItem("gm_sid");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("gm_sid", id);
    }
    return id;
  } catch {
    return null;
  }
}

export function track(type: EventType, productSlug?: string) {
  if (typeof window === "undefined") return;
  void supabase
    .from("events")
    .insert({
      type,
      path: window.location.pathname,
      product_slug: productSlug ?? null,
      session_id: sessionId(),
      referrer: document.referrer || null,
    })
    .then(() => undefined);
}
