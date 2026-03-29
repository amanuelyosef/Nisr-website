// ─── Use Case: getSellerProfile ───────────────────────────────────────────────
import type { ISellerRepository } from "../../domain/repositories/ISellerRepository";
import type { Seller } from "../../domain/entities/seller";
import { firebaseSellerRepository } from "../../infrastructure/repositories/FirebaseSellerRepository";

export async function getSellerProfile(
  sellerId: string,
  repo: ISellerRepository = firebaseSellerRepository
): Promise<Seller | null> {
  if (!sellerId) return null;
  return repo.getById(sellerId);
}
