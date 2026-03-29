// ─── Hook: useSellerProducts ──────────────────────────────────────────────────
import { useState, useEffect, useCallback, useRef } from "react";
import type { SellerProduct } from "../../domain/entities/seller";
import type { QueryDocumentSnapshot } from "firebase/firestore";
import {
  getSellerProducts,
  SELLER_PAGE_SIZE,
} from "../../application/useCases/getSellerProducts";

type UseSellerProductsResult = {
  products: SellerProduct[];
  productsLoading: boolean;
  productsError: string | null;
  productsLoadingMore: boolean;
  hasMoreProducts: boolean;
  loadMoreProducts: () => void;
};

export function useSellerProducts(
  sellerId: string | undefined,
): UseSellerProductsResult {
  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [productsLoadingMore, setProductsLoadingMore] = useState(false);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const lastDocRef = useRef<QueryDocumentSnapshot | null>(null);
  const isLoadingRef = useRef(false);

  const fetchProducts = useCallback(
    async (isLoadMore: boolean) => {
      if (!sellerId) {
        setProducts([]);
        setProductsLoading(false);
        setHasMoreProducts(false);
        lastDocRef.current = null;
        return;
      }
      if (isLoadingRef.current) return;
      isLoadingRef.current = true;

      if (isLoadMore) {
        setProductsLoadingMore(true);
      } else {
        setProductsLoading(true);
        setProductsError(null);
        setHasMoreProducts(true);
        lastDocRef.current = null;
      }

      try {
        const cursor = isLoadMore ? lastDocRef.current : null;
        const result = await getSellerProducts(
          sellerId,
          cursor,
          SELLER_PAGE_SIZE,
        );

        setProducts((prev: SellerProduct[]) =>
          isLoadMore ? [...prev, ...result.products] : result.products,
        );
        lastDocRef.current = result.lastDoc;
        setHasMoreProducts(result.hasMore);
      } catch {
        setProductsError("Unable to load products");
      } finally {
        isLoadingRef.current = false;
        if (isLoadMore) {
          setProductsLoadingMore(false);
        } else {
          setProductsLoading(false);
        }
      }
    },
    [sellerId],
  );

  useEffect(() => {
    fetchProducts(false);
  }, [fetchProducts]);

  const loadMoreProducts = useCallback(() => {
    if (hasMoreProducts && !productsLoading && !productsLoadingMore) {
      fetchProducts(true);
    }
  }, [fetchProducts, hasMoreProducts, productsLoading, productsLoadingMore]);

  return {
    products,
    productsLoading,
    productsError,
    productsLoadingMore,
    hasMoreProducts,
    loadMoreProducts,
  };
}
