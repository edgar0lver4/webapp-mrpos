export type Category = {
  name: string;
  uniqueId: string;
  businessId: string;
};
export type Letter = {
  name: string;
  price: number;
  categoryId: string;
  isVariable: boolean;
  letterId: string;
};

export interface LetterRepository {
  createLetter(val: Letter): Promise<void>;
}

export interface CategoryRepository {
  getAllCategories(): Promise<Category[]>;
  createCategory(name: string): Promise<Category>;
  updateCategory(category: Category): Promise<Category>;
}
