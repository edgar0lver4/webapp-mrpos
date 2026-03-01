import { FirebaseUseCases } from "@application/Firebase/FirebaseUseCases";
import { SecurityUseCases } from "@application/Security/SecurityUseCases";
import { DB_CORE_NAMES } from "@core/Database/Core";
import { Category, CategoryRepository, Letter } from "@core/Letters/domain";
import { where } from "firebase/firestore";

export class CategoryApiRepository implements CategoryRepository {
  protected dbController;
  protected securityController;
  protected businessId;
  constructor(businessId: string) {
    this.businessId = businessId;
    const DB_NAME = `${DB_CORE_NAMES.CATEGORY}/${businessId}`;
    this.dbController = new FirebaseUseCases(DB_NAME);
    this.securityController = new SecurityUseCases();
  }
  async createCategory(name: string): Promise<Category> {
    try {
      const uniqueId = this.securityController.generateRandomId();
      const payload: Category = {
        name,
        uniqueId,
        businessId: this.businessId,
      };
      await this.dbController.insert(payload);
      return payload;
    } catch (e) {
      throw new Error("Error al crear la carta");
    }
  }

  async updateCategory(category: Category): Promise<Category> {
    try {
      await this.dbController.update(category);
      return category;
    } catch (e) {
      throw new Error("Error al crear la carta");
    }
  }

  async getAllCategories(): Promise<Category[]> {
    try {
      const getAll = await this.dbController.get<Category>();
      const order = getAll.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      return order;
    } catch (e) {
      throw new Error("Error al obtener las categorias");
    }
  }

  async deleteCategory(categoryId: string): Promise<void> {
    try {
      const query = where("uniqueId", "==", categoryId);
      await this.dbController.delete(query);
    } catch (e) {
      throw new Error("Error al obtener las categorias");
    }
  }
}
