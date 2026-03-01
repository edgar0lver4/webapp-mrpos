import { Button, Modal, Portal } from "@mui/material";
import { ModalContainer } from "@ui/components/ModalContainer";
import { CategoryContexts } from "@ui/contexts/Categroy";
import { CategoryContextProps } from "@ui/contexts/Categroy/type";
import { useFormik } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import { FaBan, FaCheck } from "react-icons/fa";

export const ButtonGeneratorList = () => {
  const { create: createdCat } = useContext(
    CategoryContexts
  ) as CategoryContextProps;
  const [create, setCreate] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const toggleCreate = () => setCreate((prev) => !prev);
  const toggleModal = () => setOpenModal((prev) => !prev);
  const inputRef = useRef<HTMLInputElement>(null);

  const INITIAL_STATE = {
    name: "",
  };

  const handleCreate = async (val: typeof INITIAL_STATE) => {
    const isCreated = await createdCat(val.name);
    if (isCreated) {
      toggleCreate();
      toggleModal();
      handleReset(INITIAL_STATE);
    }
  };

  const { values, handleSubmit, handleBlur, handleReset, handleChange } =
    useFormik({
      initialValues: INITIAL_STATE,
      onSubmit: handleCreate,
    });

  useEffect(() => {
    if (create) {
      inputRef.current?.focus();
    }
  }, [create]);

  if (create) {
    return (
      <div className="w-full p-2 border-4 border-dashed border-primary-o flex flex-row">
        <input
          className="w-full description-body-semibold outline-transparent "
          placeholder="Nombre de la categoría"
          id="name"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          ref={inputRef}
        />
        <button
          onClick={() => toggleCreate()}
          className="border-1 border-error-dark rounded-lg p-1 bg-error mr-1 hover:cursor-pointer"
        >
          <FaBan size={18} color="#fff" />
        </button>
        <button
          onClick={() => toggleModal()}
          className="border-1 border-success-dark rounded-lg p-1 bg-success hover:cursor-pointer"
        >
          <FaCheck size={18} color="#fff" />
        </button>
        <Portal>
          <Modal
            open={openModal}
            className="w-full h-full flex items-center justify-center"
          >
            <ModalContainer
              title="Crear categoría"
              subtitile={`¿Desea crear la categoria ${values.name}?`}
            >
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button fullWidth onClick={toggleModal}>
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleSubmit()}
                >
                  Crear
                </Button>
              </div>
            </ModalContainer>
          </Modal>
        </Portal>
      </div>
    );
  }

  return (
    <button
      onClick={() => toggleCreate()}
      className={`w-full p-2 duration-300 ease-in text-left h-auto
        border-4 description-body-semibold border-dashed
       hover:cursor-pointer`}
    >
      Crear nueva categoría
    </button>
  );
};
