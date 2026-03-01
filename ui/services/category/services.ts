import { Category, Letter } from "@core/Letters/domain";
import { API_BASE } from "@infraestructure/Urls";
import axios from "axios";
import { CreateLetterReq } from "./type";

export const createCategory = async (name: string): Promise<boolean> => {
  try {
    const { status } = await axios.post(`${API_BASE}/carta`, {
      name,
    });
    return status === 201;
  } catch (e) {
    console.log("Error:", e);
    return false;
  }
};

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const { data } = await axios.get(`${API_BASE}/carta`);
    return data.data;
  } catch (e) {
    console.log("Error:", e);
    return [];
  }
};

export const deleteCategory = async (categoryId: string): Promise<boolean> => {
  try {
    const { status } = await axios.delete(`${API_BASE}/carta/${categoryId}`);
    return status === 204;
  } catch (e) {
    console.log("Error:", e);
    return false;
  }
};

export const getLetterById = async (categoryId: string): Promise<Letter[]> => {
  try {
    const { data } = await axios.get<{ data: Letter[] }>(
      `${API_BASE}/carta/${categoryId}`
    );
    return data.data;
  } catch (e) {
    console.log("Error:", e);
    return [];
  }
};

export const createLetter = async ({
  categoryId,
  isVariable,
  name,
  price,
}: CreateLetterReq): Promise<boolean> => {
  try {
    const { status } = await axios.post(`${API_BASE}/carta/${categoryId}`, {
      isVariable,
      name,
      price,
    });
    return status === 200;
  } catch (e) {
    console.log("Error:", e);
    return false;
  }
};
