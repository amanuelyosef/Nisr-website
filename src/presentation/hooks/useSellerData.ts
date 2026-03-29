// ─── Hook: useSellerData ──────────────────────────────────────────────────────
import { useState, useEffect } from "react";
import type { Seller } from "../../domain/entities/seller";
import { getSellerProfile } from "../../application/useCases/getSellerProfile";

type UseSellerDataResult = {
  seller: Seller | null;
  sellerLoading: boolean;
  sellerError: string | null;
};

export function useSellerData(
  sellerId: string | undefined,
): UseSellerDataResult {
  const [seller, setSeller] = useState<Seller | null>(null);
  const [sellerLoading, setSellerLoading] = useState(true);
  const [sellerError, setSellerError] = useState<string | null>(null);

  useEffect(() => {
    if (!sellerId) {
      setSeller(null);
      setSellerLoading(false);
      return;
    }

    let cancelled = false;
    setSellerLoading(true);
    setSellerError(null);

    getSellerProfile(sellerId)
      .then((data) => {
        if (cancelled) return;
        if (data) {
          setSeller(data);
        } else {
          setSeller(null);
          setSellerError("Seller not found");
        }
        setSellerLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setSellerError("Unable to load seller info");
        setSellerLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [sellerId]);

  return { seller, sellerLoading, sellerError };
}
