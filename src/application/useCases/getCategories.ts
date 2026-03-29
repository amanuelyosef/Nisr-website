// ─── Use Case: getCategories ──────────────────────────────────────────────────
import type { ICategoryRepository } from "../../domain/repositories/ICategoryRepository";
import type { Category, CategoryMap } from "../../domain/entities/category";
import { firebaseCategoryRepository } from "../../infrastructure/repositories/FirebaseCategoryRepository";

export async function getCategories(
  repo: ICategoryRepository = firebaseCategoryRepository
): Promise<Category[]> {
  return repo.getAll();
}

/** Converts a category array to a lookup map keyed by id */
export function buildCategoryMap(categories: Category[]): CategoryMap {
  const map: CategoryMap = {};
  categories.forEach((cat) => {
    if (cat?.id) map[cat.id] = cat;
  });
  return map;
}
