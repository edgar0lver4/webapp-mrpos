import { Category, Letter } from "@core/Letters/domain";
import { ReactNode } from "react";

export type LetterCreation = {
  categoryId: string;
  name: string;
  price: number;
  isVariable: number;
};

export interface CategoryContextProps {
  create: (name: string) => Promise<boolean>;
  deleteCat: (id: string) => Promise<boolean>;
  loadLetters: (categoryId: string) => Promise<void>;
  handleCreateLetter: (letter: LetterCreation) => Promise<void>;
  categories: Category[];
  letters: Letter[];
  isLoadLetters: boolean;
}

export type Props = {
  children: ReactNode | ReactNode[];
};
