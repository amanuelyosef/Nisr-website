// ─── Use Case: getRecommendedProducts ─────────────────────────────────────────
import type { IProductRepository } from "../../domain/repositories/IProductRepository";
import type { ListProduct, RecommendedProductPage } from "../../domain/entities/product";
import { firebaseProductRepository } from "../../infrastructure/repositories/FirebaseProductRepository";

/** Fisher-Yates shuffle – pure function, lives here in application layer */
export function shuffleArray<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function getRecommendedProducts(
  docId: string,
  repo: IProductRepository = firebaseProductRepository
): Promise<{ list: ListProduct[]; nextDocumentId: string | null }> {
  const page: RecommendedProductPage | null = await repo.getRecommendedPage(docId);
  if (!page) return { list: [], nextDocumentId: null };

  return {
    list: shuffleArray(page.list ?? []),
    nextDocumentId: page.nextDocumentId ?? null,
  };
}
