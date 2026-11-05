CREATE OR REPLACE FUNCTION public.customer_order_count(_phone text)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT count(*)::int FROM public.orders
  WHERE delivery_method IN ('ridicare','livrare')
    AND length(regexp_replace(coalesce(_phone,''), '\D', '', 'g')) >= 9
    AND right(regexp_replace(phone, '\D', '', 'g'), 9) = right(regexp_replace(_phone, '\D', '', 'g'), 9)
    AND coalesce(status, '') <> 'anulat';
$$;