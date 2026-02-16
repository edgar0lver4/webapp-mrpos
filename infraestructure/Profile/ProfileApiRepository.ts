import { BusinessUseCases } from "@application/Business/BusinessUseCases";
import { CategoryUseCase } from "@application/Letters/CategoryUseCase";
import { LettersUseCase } from "@application/Letters/LettersUseCase";
import { SecurityUseCases } from "@application/Security/SecurityUseCases";
import { UserUseCase } from "@application/User/UserUseCase";
import { ProfileRepository, ProfileSession } from "@core/Profile/domain";
import { User } from "@core/User/domain";
import { USER_TYPES } from "@core/User/enum";

export class ProfileApiRepository implements ProfileRepository {
  protected userController;
  protected security;

  constructor() {
    this.userController = new UserUseCase();
    this.security = new SecurityUseCases();
  }
  async terminateRegister(token: string): Promise<string> {
    try {
      const DEFAULT_NAME = "Categoría de prueba";
      const userDate: User = this.security.decriptJWT(token);
      const findUser = await this.userController.getUserByEmail(userDate.email);
      const businessController = new BusinessUseCases(findUser.uniqueId);
      const createBusiness = await businessController.createDefaultBusiness(
        findUser.businessName
      );
      const categoryController = new CategoryUseCase(createBusiness.uniqueId);
      const category = await categoryController.createCategory(DEFAULT_NAME);
      const letterController = new LettersUseCase(category.uniqueId);
      await letterController.createLetter({
        categoryId: category.uniqueId,
        isVariable: false,
        name: "Prueba",
        price: 1000,
      });
      const payload: ProfileSession = {
        businessId: createBusiness.uniqueId,
        email: findUser.email,
        userId: findUser.uniqueId,
        userType: findUser.type,
      };
      const jwt = this.security.generateJWT(payload);
      return jwt;
    } catch (e) {
      console.log("Error al crear el registro:", e);
      throw new Error("Error al terminar el registro");
    }
  }

  async sessionStart(email: string, password: string): Promise<string> {
    try {
      const findUser = await this.userController.getUserByEmailAndPassword(
        email,
        password
      );
      if (findUser) {
        if (findUser.type === USER_TYPES.ADMIN) {
          const businessController = new BusinessUseCases(findUser.uniqueId);
          const business = await businessController.getBusiness();
          const payload = {
            email,
            userType: findUser.type,
            userId: findUser.uniqueId,
            businessId: business.uniqueId,
          };
          const jwt = this.security.generateJWT(payload);
          return jwt;
        }
        const payload = {
          email,
          userType: findUser.type,
          userId: findUser.uniqueId,
          businessId: "",
        };
        const jwt = this.security.generateJWT(payload);
        return jwt;
      }
      throw new Error("Usuario o contraseña inválido");
    } catch (e) {
      throw new Error("Error al iniciar sesión");
    }
  }
}
