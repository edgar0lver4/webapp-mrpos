import { ProfileApiRepository } from "@infraestructure/Profile/ProfileApiRepository";

export class ProfileUseCase {
  protected apiRepository;
  constructor() {
    this.apiRepository = new ProfileApiRepository();
  }

  async terminateRegister(token: string): Promise<string> {
    return this.apiRepository.terminateRegister(token);
  }

  async sessionStart(email: string, password: string): Promise<string> {
    return this.apiRepository.sessionStart(email, password);
  }
}
