export type Category = {
  name: string;
  uniqueId: string;
};
export type Letter = {
  name: string;
  price: number;
  categoryId: string;
  isVariable: boolean;
};

export interface LetterRepository {
  createLetter(val: Letter): Promise<void>;
}

export interface CategoryRepository {
  createCategory(name: string): Promise<Category>;
  updateCategory(category: Category): Promise<Category>;
}
