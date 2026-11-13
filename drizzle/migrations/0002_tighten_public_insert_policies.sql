DROP POLICY IF EXISTS "anyone can log events" ON public.events;
CREATE POLICY "anyone can log valid events" ON public.events FOR INSERT TO anon, authenticated
WITH CHECK (
  type ~ '^[a-z_]{1,40}$'
  AND (path IS NULL OR length(path) <= 300)
  AND (product_slug IS NULL OR product_slug ~ '^[a-z0-9-]{1,80}$')
  AND (session_id IS NULL OR length(session_id) <= 100)
  AND (referrer IS NULL OR length(referrer) <= 500)
);

DROP POLICY IF EXISTS "anyone can place an order" ON public.orders;
CREATE POLICY "anyone can place a valid order" ON public.orders FOR INSERT TO anon, authenticated
WITH CHECK (
  status = 'nou'
  AND length(customer_name) BETWEEN 1 AND 100
  AND length(phone) BETWEEN 1 AND 20
  AND (email IS NULL OR length(email) <= 255)
  AND delivery_method IN ('ridicare','livrare','newsletter','abonament','eveniment','b2b')
  AND (address IS NULL OR length(address) <= 300)
  AND (note IS NULL OR length(note) <= 1000)
  AND jsonb_typeof(items) = 'array' AND jsonb_array_length(items) <= 50
  AND total >= 0 AND total <= 100000
  AND (time_slot IS NULL OR length(time_slot) <= 40)
  AND (order_number IS NULL OR length(order_number) <= 40)
);