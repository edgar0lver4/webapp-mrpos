"use client";
import { useState } from "react";
import { Props } from "./type";

const ListCategory = ({ categories }: Props) => {
  const [categorySelected, setSelectedCategory] = useState("");
  const handleSelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };
  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col w-1/3">
        {categories.map((category) => (
          <button
            key={`tim-${category.uniqueId}`}
            onClick={() => handleSelect(category.uniqueId)}
            className={`w-full p-2 duration-300 ease-in text-left h-auto ${
              categorySelected === category.uniqueId
                ? "border-l-4 border-primary-o text-primary-o description-body-bold"
                : "border-l-4 description-body-semibold"
            } hover:cursor-pointer`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="w-2/3 grid grid-cols-4 gap-4 p-4 bg-default-afable min-h-[70vh]"></div>
    </div>
  );
};

export default ListCategory;
