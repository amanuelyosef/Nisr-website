// ─── Shared Constants: Sort Options ───────────────────────────────────────────
// Moved from SearchResultsPage.tsx

export const SORT_OPTIONS = ["Most viewed", "Newest", "Lowest price", "Highest price"] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export const SORT_INDEX_MAP: Record<SortOption, string | undefined> = {
  "Most viewed": undefined,
  "Newest": "search product posted date descending",
  "Lowest price": "search product price ascending",
  "Highest price": "search product price descending",
};
