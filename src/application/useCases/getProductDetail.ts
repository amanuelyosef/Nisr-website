// ─── Use Case: getProductDetail ───────────────────────────────────────────────
import type { IProductRepository } from "../../domain/repositories/IProductRepository";
import type { ProductDetail } from "../../domain/entities/product";
import { firebaseProductRepository } from "../../infrastructure/repositories/FirebaseProductRepository";

export async function getProductDetail(
  id: string,
  repo: IProductRepository = firebaseProductRepository
): Promise<ProductDetail | null> {
  if (!id) return null;
  return repo.getById(id);
}
