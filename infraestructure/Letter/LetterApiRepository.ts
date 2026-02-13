import { FirebaseUseCases } from "@application/Firebase/FirebaseUseCases";
import { DB_CORE_NAMES } from "@core/Database/Core";
import { Letter, LetterRepository } from "@core/Letters/domain";

export class LetterApiRepository implements LetterRepository {
  protected dbController;
  constructor(uniqueId: string) {
    const DB_NAME = `${DB_CORE_NAMES.MENU}/${uniqueId}`;
    this.dbController = new FirebaseUseCases(DB_NAME);
  }
  async createLetter(val: Letter): Promise<void> {
    try {
      await this.dbController.insert(val);
    } catch (e) {
      throw new Error("Error al crear la carta");
    }
  }
}
