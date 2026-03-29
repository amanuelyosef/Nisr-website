// ─── Hook: useRecommendedProducts ─────────────────────────────────────────────
import { useState, useEffect, useCallback, useRef } from "react";
import type { ListProduct } from "../../domain/entities/product";
import { getRecommendedProducts } from "../../application/useCases/getRecommendedProducts";

type UseRecommendedProductsResult = {
  productList: ListProduct[];
  isFetching: boolean;
  hasMore: boolean;
  fetchNextBatch: () => void;
};

export function useRecommendedProducts(): UseRecommendedProductsResult {
  const [productList, setProductList] = useState<ListProduct[]>([]);
  const [nextDocumentId, setNextDocumentId] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const isFetchingRef = useRef(false);

  // Load the first page on mount
  useEffect(() => {
    let cancelled = false;
    setIsFetching(true);
    isFetchingRef.current = true;

    getRecommendedProducts("page_1").then(
      ({ list, nextDocumentId: nextId }) => {
        if (cancelled) return;
        setProductList(list);
        setNextDocumentId(nextId);
        setHasMore(Boolean(nextId));
        setIsFetching(false);
        isFetchingRef.current = false;
      },
    );

    return () => {
      cancelled = true;
    };
  }, []);

  const fetchNextBatch = useCallback(async () => {
    if (isFetchingRef.current || !hasMore || !nextDocumentId) return;

    isFetchingRef.current = true;
    setIsFetching(true);

    let currentId: string | null = nextDocumentId;
    const combined: ListProduct[] = [];

    // Fetch up to 3 pages at a time then add them all at once (matches original behavior)
    for (let i = 0; i < 3 && currentId; i++) {
      const { list, nextDocumentId: nextId } =
        await getRecommendedProducts(currentId);
      combined.push(...list);
      currentId = nextId;
      if (!currentId) break;
    }

    if (combined.length) {
      setProductList((prev: ListProduct[]) => [...prev, ...combined]);
    }

    setNextDocumentId(currentId);
    setHasMore(Boolean(currentId));
    setIsFetching(false);
    isFetchingRef.current = false;
  }, [hasMore, nextDocumentId]);

  return { productList, isFetching, hasMore, fetchNextBatch };
}
