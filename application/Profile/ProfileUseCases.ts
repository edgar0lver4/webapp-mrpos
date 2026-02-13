import { ProfileApiRepository } from "@infraestructure/Profile/ProfileApiRepository";

export class ProfileUseCase {
  protected apiRepository;
  constructor() {
    this.apiRepository = new ProfileApiRepository();
  }
  async terminateRegister(token: string): Promise<boolean> {
    return this.apiRepository.terminateRegister(token);
  }
}
