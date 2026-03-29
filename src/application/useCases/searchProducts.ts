// ─── Use Case: searchProducts ─────────────────────────────────────────────────
import type { ISearchProductRepository } from "../../domain/repositories/IProductRepository";
import type { ListProduct } from "../../domain/entities/product";
import { algoliaProductRepository } from "../../infrastructure/repositories/AlgoliaProductRepository";

export type SearchOptions = {
  hitsPerPage?: number;
  page?: number;
  filters?: string;
};

export type SearchResult = {
  hits: ListProduct[];
  nbHits: number;
  page: number;
  nbPages: number;
};

export async function searchProducts(
  query: string,
  options: SearchOptions = {},
  indexOverride?: string,
  repo: ISearchProductRepository = algoliaProductRepository
): Promise<SearchResult> {
  if (!query.trim()) {
    return { hits: [], nbHits: 0, page: 0, nbPages: 0 };
  }

  const result = await repo.search(query, options as Record<string, unknown>, indexOverride);
  return {
    hits: result.hits,
    nbHits: result.nbHits,
    page: result.page ?? 0,
    nbPages: result.nbPages ?? 0,
  };
}
