// ─── Hook: useSearchProducts ──────────────────────────────────────────────────
import { useState, useEffect, useCallback, useRef } from "react";
import type { SearchHit } from "../../domain/entities/product";
import { searchProducts } from "../../application/useCases/searchProducts";
import { buildPriceFilter } from "../../shared/utils/priceUtils";
import {
  SORT_INDEX_MAP,
  type SortOption,
} from "../../shared/constants/sortOptions";

export type SearchFilters = {
  selectedCategories: string[];
  selectedConditions: string[];
  selectedDelivery: string[];
  appliedPriceFilter: string | null;
};

type UseSearchProductsResult = {
  queryResults: SearchHit[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  fetchNextPage: () => void;
};

export { buildPriceFilter };

function buildAlgoliaFilters(filters: SearchFilters): string {
  const parts: string[] = [];

  if (filters.selectedCategories[0]) {
    parts.push(`categoryId:${filters.selectedCategories[0]}`);
  }
  if (filters.selectedConditions[0]) {
    parts.push(`condition:${filters.selectedConditions[0]}`);
  }
  if (filters.selectedDelivery[0]) {
    const delivery = filters.selectedDelivery[0];
    if (delivery === "Free Delivery") parts.push("freeDelivery:true");
    else if (delivery === "Paid Delivery") parts.push("freeDelivery:false");
    else if (delivery === "No Delivery") parts.push("freeDelivery:null");
  }
  if (filters.appliedPriceFilter) {
    parts.push(filters.appliedPriceFilter);
  }
  return parts.join(" AND ");
}

export function useSearchProducts(
  searchQuery: string,
  sortOption: SortOption,
  filters: SearchFilters,
): UseSearchProductsResult {
  const [queryResults, setQueryResults] = useState<SearchHit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [nbPages, setNbPages] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  // Stable key to guard stale async results
  const searchKey = [
    searchQuery,
    sortOption,
    filters.selectedCategories.join(","),
    filters.selectedConditions.join(","),
    filters.selectedDelivery.join(","),
    filters.appliedPriceFilter ?? "",
  ].join("|");

  const searchKeyRef = useRef(searchKey);

  useEffect(() => {
    searchKeyRef.current = searchKey;

    if (!searchQuery) {
      setQueryResults([]);
      setPage(0);
      setNbPages(0);
      setHasMore(false);
      setIsLoading(false);
      setIsLoadingMore(false);
      return;
    }

    const algoliaFilters = buildAlgoliaFilters(filters);
    const options: Record<string, unknown> = { hitsPerPage: 40, page: 0 };
    if (algoliaFilters) options.filters = algoliaFilters;

    setIsLoading(true);
    setIsLoadingMore(false);
    setError(null);
    setPage(0);
    setNbPages(0);
    setHasMore(false);
    setQueryResults([]);

    searchProducts(searchQuery, options, SORT_INDEX_MAP[sortOption])
      .then((res) => {
        if (searchKeyRef.current !== searchKey) return;
        const returnedPage = res.page ?? 0;
        const totalPages = res.nbPages ?? 0;
        setQueryResults(res.hits as unknown as SearchHit[]);
        setPage(returnedPage);
        setNbPages(totalPages);
        setHasMore(returnedPage + 1 < totalPages);
        setIsLoading(false);
        setIsLoadingMore(false);
      })
      .catch((err: Error) => {
        if (searchKeyRef.current !== searchKey) return;
        setError(err?.message ?? "Search failed");
        setQueryResults([]);
        setPage(0);
        setNbPages(0);
        setHasMore(false);
        setIsLoading(false);
        setIsLoadingMore(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey, searchQuery]);

  const fetchNextPage = useCallback(async () => {
    if (!searchQuery || !hasMore) return;

    const nextPage = page + 1;
    const currentKey = searchKeyRef.current;

    setIsLoadingMore(true);
    setError(null);

    const algoliaFilters = buildAlgoliaFilters(filters);
    const options: Record<string, unknown> = {
      hitsPerPage: 40,
      page: nextPage,
    };
    if (algoliaFilters) options.filters = algoliaFilters;

    try {
      const res = await searchProducts(
        searchQuery,
        options,
        SORT_INDEX_MAP[sortOption],
      );
      if (searchKeyRef.current !== currentKey) return;
      const returnedPage = res.page ?? nextPage;
      const totalPages = res.nbPages ?? nbPages;
      setQueryResults((prev: SearchHit[]) => [
        ...prev,
        ...(res.hits as unknown as SearchHit[]),
      ]);
      setPage(returnedPage);
      setNbPages(totalPages);
      setHasMore(returnedPage + 1 < totalPages);
    } catch (err: unknown) {
      if (searchKeyRef.current !== currentKey) return;
      setError((err as Error)?.message ?? "Search failed");
    } finally {
      if (searchKeyRef.current === currentKey) {
        setIsLoadingMore(false);
      }
    }
  }, [searchQuery, sortOption, filters, hasMore, page, nbPages]);

  return {
    queryResults,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    fetchNextPage,
  };
}
