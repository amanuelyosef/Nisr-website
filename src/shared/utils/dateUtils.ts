// ─── Shared Utilities: Date Utilities ─────────────────────────────────────────
// Moved from SellerShopPage.tsx

export type TimestampLike = { toDate(): Date } | Date | null | undefined;

export function toDateValue(value: TimestampLike): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (
    typeof value === "object" &&
    "toDate" in value &&
    typeof (value as { toDate(): Date }).toDate === "function"
  ) {
    return (value as { toDate(): Date }).toDate();
  }
  return null;
}

export function formatTimeAgo(date: Date | null): string {
  if (!date) return "Unavailable";

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60)
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;

  const days = Math.floor(hours / 24);
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} ${months === 1 ? "month" : "months"} ago`;

  const years = Math.floor(days / 365);
  return `${years} ${years === 1 ? "year" : "years"} ago`;
}

export function formatTenure(date: Date | null): string {
  if (!date) return "On Nisr Market";

  const now = Date.now();
  const diffDays = Math.max(
    0,
    Math.floor((now - date.getTime()) / (1000 * 60 * 60 * 24)),
  );

  if (diffDays === 0) return "Today on Nisr Market";
  if (diffDays < 7)
    return `${diffDays} ${diffDays === 1 ? "day" : "days"} on Nisr Market`;

  const weeks = Math.floor(diffDays / 7);
  if (weeks < 4)
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} on Nisr Market`;

  const months = Math.floor(diffDays / 30);
  if (months < 12)
    return `${months} ${months === 1 ? "month" : "months"} on Nisr Market`;

  const years = Math.floor(diffDays / 365);
  return `${years} ${years === 1 ? "year" : "years"} on Nisr Market`;
}

/** Formats a date-like input (Date or Firestore Timestamp) as DD/MM/YYYY */
export function formatDate(dateInput: TimestampLike): string {
  const date = toDateValue(dateInput);
  if (!date) return "N/A";
  return date.toLocaleDateString("en-GB");
}
