import { useContext, useState } from "react";
import { Props } from "./type";
import { ButtonGeneratorList } from "./Generator";
import { FaTrash } from "react-icons/fa";
import { Button, Divider, Modal, Portal } from "@mui/material";
import { Category } from "@core/Letters/domain";
import { CategoryContexts } from "@ui/contexts/Categroy";
import { CategoryContextProps } from "@ui/contexts/Categroy/type";
import { ModalContainer } from "../ModalContainer";

const ListCategory = ({ categories }: Props) => {
  const { deleteCat, loadLetters } = useContext(
    CategoryContexts
  ) as CategoryContextProps;
  const [categorySelected, setSelectedCategory] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [categoryDelete, setCategoryDelete] = useState<Category>();

  const toggleDeleteModal = () => setOpenModal((prev) => !prev);

  const handleTakeDelete = (cat: Category) => {
    toggleDeleteModal();
    setCategoryDelete(cat);
  };

  const confirmDelete = async () => {
    if (categoryDelete?.uniqueId) {
      const isDeleted = await deleteCat(categoryDelete.uniqueId);
      if (isDeleted) {
        toggleDeleteModal();
      }
    }
  };

  const handleSelect = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    await loadLetters(categoryId);
  };
  return (
    <div className="flex flex-col w-1/3 gap-1 pr-1">
      {categories.map((category) => (
        <div className="flex flex-row" key={category.uniqueId}>
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
          <button
            className="hover: cursor-pointer"
            onClick={() => handleTakeDelete(category)}
          >
            <FaTrash color="var(--error-dark)" />
          </button>
        </div>
      ))}
      <ButtonGeneratorList />
      <Portal>
        <Modal
          open={openModal}
          className="flex w-full h-full items-center justify-center"
        >
          <ModalContainer
            title="¿Deseas eliminar está categoría?"
            subtitile="Está accion es irreversible y se perderan todos los platillos"
          >
            <div className="mt-2 grid grid-cols-2 gap-3 justify-between">
              <Button fullWidth onClick={toggleDeleteModal}>
                Cancelar
              </Button>
              <Button fullWidth variant="contained" onClick={confirmDelete}>
                Eliminar
              </Button>
            </div>
          </ModalContainer>
        </Modal>
      </Portal>
    </div>
  );
};

export default ListCategory;
