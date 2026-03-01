"use client";
import { createContext, useCallback, useEffect, useState } from "react";
import { CategoryContextProps, LetterCreation, Props } from "./type";
import { Category, Letter } from "@core/Letters/domain";
import {
  createCategory,
  createLetter,
  deleteCategory,
  getAllCategories,
  getLetterById,
} from "@ui/services/category/services";

export const CategoryContexts = createContext<CategoryContextProps | null>(
  null
);

export const CategoryProvider = ({ children }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [letters, setLetters] = useState<Letter[]>([]);
  const [isLoadLetters, setIsLoadLetters] = useState(false);

  const refreshCategories = async () => {
    const category = await getAllCategories();
    setCategories(category);
  };

  const create = async (name: string) => {
    const created = await createCategory(name);
    await refreshCategories();
    return created;
  };

  const deleteCat = async (id: string) => {
    const deleted = await deleteCategory(id);
    await refreshCategories();
    return deleted;
  };

  const loadLetters = async (categoryId: string) => {
    setIsLoadLetters(true);
    const letterList = await getLetterById(categoryId);
    setLetters(letterList);
    setIsLoadLetters(false);
  };

  const handleCreateLetter = async (letter: LetterCreation) => {
    setIsLoadLetters(true);
    const isCreated = await createLetter(letter);
    if (isCreated) {
      await loadLetters(letter.categoryId);
    }
    setIsLoadLetters(false);
  };

  const initData = useCallback(async () => {
    await refreshCategories();
  }, []);

  useEffect(() => {
    initData();
  }, [initData]);

  return (
    <CategoryContexts.Provider
      value={{
        categories,
        letters,
        isLoadLetters,
        create,
        deleteCat,
        loadLetters,
        handleCreateLetter,
      }}
    >
      {children}
    </CategoryContexts.Provider>
  );
};
