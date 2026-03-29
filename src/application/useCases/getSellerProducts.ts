// ─── Use Case: getSellerProducts ──────────────────────────────────────────────
import type { ISellerRepository, SellerProductsPage } from "../../domain/repositories/ISellerRepository";
import type { QueryDocumentSnapshot } from "firebase/firestore";
import { firebaseSellerRepository } from "../../infrastructure/repositories/FirebaseSellerRepository";

export const SELLER_PAGE_SIZE = 16;

export async function getSellerProducts(
  sellerId: string,
  cursor: QueryDocumentSnapshot | null = null,
  pageSize: number = SELLER_PAGE_SIZE,
  repo: ISellerRepository = firebaseSellerRepository
): Promise<SellerProductsPage> {
  if (!sellerId) {
    return { products: [], lastDoc: null, hasMore: false };
  }
  return repo.getProducts(sellerId, cursor, pageSize);
}
