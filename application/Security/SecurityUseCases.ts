import { SecurityApiRepository } from "@infraestructure/Security/securityApiRepository";

export class SecurityUseCases {
  protected apiRepository: SecurityApiRepository;
  constructor() {
    this.apiRepository = new SecurityApiRepository();
  }
  generateRandomId() {
    const part1 = Math.floor(1000 + Math.random() * 9000);
    const part2 = Math.floor(1000 + Math.random() * 9000);
    return `${part1}-${part2}`;
  }
  generateJWT(body: any): string {
    return this.apiRepository.generateJWT(body);
  }
  decriptJWT<T>(token: string): T {
    return this.apiRepository.decriptJWT(token);
  }
}
