// ─── Use Case: getTrendProducts ───────────────────────────────────────────────
import type { IProductRepository } from "../../domain/repositories/IProductRepository";
import type { TrendData } from "../../domain/entities/trends";
import { firebaseProductRepository } from "../../infrastructure/repositories/FirebaseProductRepository";

export async function getTrendProducts(
  repo: IProductRepository = firebaseProductRepository
): Promise<TrendData | null> {
  return repo.getTrends();
}
