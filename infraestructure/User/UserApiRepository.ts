import { FirebaseUseCases } from "@application/Firebase/FirebaseUseCases";
import { DB_NAMES_USERS } from "@core/Database/Users";
import { User, UserRepository } from "@core/User/domain";
import { where } from "firebase/firestore";

export class UserApiRepository implements UserRepository {
  protected dbController;

  constructor() {
    this.dbController = new FirebaseUseCases(DB_NAMES_USERS.USERS);
  }
  async getUserByEmail(email: string): Promise<User> {
    try {
      const find = where("email", "==", email);
      const data = await this.dbController.get<Array<User>>(find);
      return data?.[0];
    } catch (e) {
      throw new Error("Error al obtener datos del usuario");
    }
  }
}
