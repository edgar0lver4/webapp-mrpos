import { FirebaseUseCases } from "@application/Firebase/FirebaseUseCases";
import { DB_CORE_NAMES } from "@core/Database/Core";
import { Letter, LetterRepository } from "@core/Letters/domain";
import { where } from "firebase/firestore";

export class LetterApiRepository implements LetterRepository {
  protected dbController;
  protected categoryId;
  constructor(categoryId: string) {
    const DB_NAME = `${DB_CORE_NAMES.MENU}/${categoryId}`;
    this.dbController = new FirebaseUseCases(DB_NAME);
    this.categoryId = categoryId;
  }

  async createLetter(val: Letter): Promise<void> {
    try {
      await this.dbController.insert(val);
    } catch (e) {
      throw new Error("Error al crear la carta");
    }
  }

  async getAll(): Promise<Letter[]> {
    try {
      const query = where("categoryId", "==", this.categoryId);
      const find = await this.dbController.get<Letter>(query);
      return find;
    } catch (e) {
      throw new Error("Error al crear la carta");
    }
  }
}
