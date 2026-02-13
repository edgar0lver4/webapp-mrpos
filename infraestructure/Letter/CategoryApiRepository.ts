import { FirebaseUseCases } from "@application/Firebase/FirebaseUseCases";
import { SecurityUseCases } from "@application/Security/SecurityUseCases";
import { DB_CORE_NAMES } from "@core/Database/Core";
import { Category, CategoryRepository, Letter } from "@core/Letters/domain";

export class CategoryApiRepository implements CategoryRepository {
  protected dbController;
  protected securityController;
  constructor(uniqueId: string) {
    const DB_NAME = `${DB_CORE_NAMES.CATEGORY}/${uniqueId}`;
    this.dbController = new FirebaseUseCases(DB_NAME);
    this.securityController = new SecurityUseCases();
  }
  async createCategory(name: string): Promise<Category> {
    try {
      const uniqueId = this.securityController.generateRandomId();
      const payload: Category = {
        name,
        uniqueId,
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
}
