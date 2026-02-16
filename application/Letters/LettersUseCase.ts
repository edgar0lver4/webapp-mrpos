import { Letter, LetterRepository } from "@core/Letters/domain";
import { LetterApiRepository } from "@infraestructure/Letter/LetterApiRepository";

export class LettersUseCase {
  protected apiRepository: LetterRepository;
  constructor(categoryId: string) {
    this.apiRepository = new LetterApiRepository(categoryId);
  }
  async createLetter(val: Letter): Promise<void> {
    return this.apiRepository.createLetter(val);
  }
}
