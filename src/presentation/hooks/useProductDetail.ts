// ─── Hook: useProductDetail ───────────────────────────────────────────────────
import { useState, useEffect } from "react";
import type { ProductDetail } from "../../domain/entities/product";
import { getProductDetail } from "../../application/useCases/getProductDetail";

type UseProductDetailResult = {
  product: ProductDetail | null;
  loading: boolean;
  error: boolean;
};

export function useProductDetail(
  id: string | undefined,
): UseProductDetailResult {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      setError(true);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(false);

    getProductDetail(id).then((data) => {
      if (cancelled) return;
      if (data) {
        setProduct(data);
      } else {
        setError(true);
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { product, loading, error };
}
