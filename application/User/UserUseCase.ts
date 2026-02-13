import { User, UserRepository } from "@core/User/domain";
import { UserApiRepository } from "@infraestructure/User/UserApiRepository";

export class UserUseCase {
  protected apiRepository: UserRepository;
  constructor() {
    this.apiRepository = new UserApiRepository();
  }
  async getUserByEmail(email: string): Promise<User> {
    return this.apiRepository.getUserByEmail(email);
  }
}
