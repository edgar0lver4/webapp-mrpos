import { BusinessUseCases } from "@application/Business/BusinessUseCases";
import { CategoryUseCase } from "@application/Letters/CategoryUseCase";
import { LettersUseCase } from "@application/Letters/LettersUseCase";
import { SecurityUseCases } from "@application/Security/SecurityUseCases";
import { UserUseCase } from "@application/User/UserUseCase";
import { ProfileRepository } from "@core/Profile/domain";
import { User } from "@core/User/domain";

export class ProfileApiRepository implements ProfileRepository {
  protected userController;
  protected security;

  constructor() {
    this.userController = new UserUseCase();
    this.security = new SecurityUseCases();
  }
  async terminateRegister(token: string): Promise<boolean> {
    try {
      const DEFAULT_NAME = "Categoría de prueba";
      const userDate: User = this.security.decriptJWT(token);
      const findUser = await this.userController.getUserByEmail(userDate.email);
      const businessController = new BusinessUseCases(findUser.uniqueId);
      const categoryController = new CategoryUseCase(findUser.uniqueId);
      const category = await categoryController.createCategory(DEFAULT_NAME);
      const letterController = new LettersUseCase(category.uniqueId);
      await businessController.createDefaultBusiness(findUser.businessName);
      await letterController.createLetter({
        categoryId: category.uniqueId,
        isVariable: false,
        name: "Prueba",
        price: 1000,
      });
      return true;
    } catch (e) {
      console.log("Error al crear el registro:", e);
      throw new Error("Error al terminar el registro");
    }
  }
}
