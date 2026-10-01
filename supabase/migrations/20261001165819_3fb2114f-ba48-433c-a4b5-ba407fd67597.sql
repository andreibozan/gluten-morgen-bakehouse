ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS order_date date, ADD COLUMN IF NOT EXISTS time_slot text, ADD COLUMN IF NOT EXISTS order_number text;

CREATE TABLE public.product_stock (
  slug text PRIMARY KEY,
  stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.product_stock TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_stock TO authenticated;
GRANT ALL ON public.product_stock TO service_role;
ALTER TABLE public.product_stock ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view stock" ON public.product_stock FOR SELECT USING (true);
CREATE POLICY "Admins manage stock" ON public.product_stock FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));

INSERT INTO public.product_stock (slug, stock) VALUES
('paine-taraneasca',0),('paine-integrala',0),('paine-cu-seminte',0),('paine-masline-rozmarin',0),
('paine-nuci-merisoare',0),('baguette-cu-maia',0),('focaccia',0),('chifle-artizanale',0);