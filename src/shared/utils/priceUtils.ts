// ─── Shared Utilities: Price Utilities ────────────────────────────────────────
// Moved from SearchResultsPage.tsx

/** Builds an Algolia price filter string from min/max string inputs */
export function buildPriceFilter(min: string, max: string): string {
  const minTrim = min.trim();
  const maxTrim = max.trim();
  if (minTrim && maxTrim) return `price >= ${minTrim} AND price <= ${maxTrim}`;
  if (minTrim) return `price >= ${minTrim}`;
  if (maxTrim) return `price <= ${maxTrim}`;
  return "";
}

/** Formats a price number for display (e.g. 1000 → "ETB 1,000") */
export function formatPrice(price: number | string | undefined): string {
  if (price === undefined || price === null || price === "") return "";
  const num = typeof price === "number" ? price : Number(price);
  if (isNaN(num)) return `ETB ${price}`;
  return `ETB ${num.toLocaleString("en-US")}`;
}
