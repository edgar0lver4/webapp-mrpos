"use client";
import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Portal,
  Select,
  TextField,
} from "@mui/material";
import ListCategory from "@ui/components/ListCategory";
import { ModalContainer } from "@ui/components/ModalContainer";
import { CategoryContexts } from "@ui/contexts/Categroy";
import { CategoryContextProps } from "@ui/contexts/Categroy/type";
import { useFormik } from "formik";
import { useContext, useState } from "react";

export const CategoryContainer = () => {
  const [showModal, setShowModal] = useState(false);
  const { categories, letters, isLoadLetters, handleCreateLetter } = useContext(
    CategoryContexts
  ) as CategoryContextProps;
  const toggleModalCreate = () => setShowModal((prev) => !prev);

  const INITIAL_VALUES = {
    categoryId: "",
    name: "",
    price: 0,
    isVariable: 0,
  };

  const onSubmit = async (e: typeof INITIAL_VALUES) => {
    onCancel();
    await handleCreateLetter(e);
  };

  const { values, handleChange, handleBlur, handleSubmit, handleReset } =
    useFormik({
      initialValues: INITIAL_VALUES,
      onSubmit: onSubmit,
    });

  const onCancel = () => {
    toggleModalCreate();
    handleReset(INITIAL_VALUES);
  };

  return (
    <div className="flex flex-row w-full">
      <ListCategory categories={categories} />
      <div className="relative w-2/3 bg-primary-o-shine min-h-[70vh]">
        {isLoadLetters && (
          <div className="absolute w-full h-full flex items-center flex-col justify-center bg-primary-o-shine opacity-50">
            <CircularProgress />
            <p className="description-body-semibold">Cargando platillos</p>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 ">
          {letters.map((itm) => (
            <button
              key={`key-${itm.letterId}`}
              className="w-[100px] h-[100px] p-2 text-primary-o bg-white border-4 description-body-semibold rounded-lg border-primary-o hover:cursor-pointer"
            >
              {itm.name}
            </button>
          ))}
          <button
            onClick={toggleModalCreate}
            className="w-[100px] h-[100px] text-primary-o bg-white border-4 description-body-semibold rounded-lg border-dashed border-primary-o hover:cursor-pointer"
          >
            Añadir platillo
          </button>
        </div>
      </div>
      <Portal>
        <Modal
          open={showModal}
          className="w-full h-full flex items-center justify-center"
        >
          <ModalContainer
            title="Añadir platillo"
            subtitile="Agrege un platillo a la categoría seleccionada"
          >
            <div className="grid grid-cols-2 gap-3">
              <TextField
                label="Nombre"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextField
                label="Precio"
                type="number"
                value={values.price}
                id="price"
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <FormControl fullWidth>
                <InputLabel id="categoryId">
                  Categoría a la que pertenece
                </InputLabel>
                <Select
                  id="categoryId"
                  name="categoryId"
                  label="Categoría a la que pertenece"
                  value={values.categoryId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {categories.map((itm) => (
                    <MenuItem key={`key-${itm.uniqueId}`} value={itm.uniqueId}>
                      {itm.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="variableCost">
                  ¿El costo es variable?
                </InputLabel>
                <Select
                  id="isVariable"
                  name="isVariable"
                  label="¿El costo es variable?"
                  value={values.isVariable}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value={0}>No</MenuItem>
                  <MenuItem value={1}>Si</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <Button fullWidth onClick={onCancel}>
                Cancelar
              </Button>
              <Button
                fullWidth
                variant="contained"
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
};
