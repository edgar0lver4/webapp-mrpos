import { Category, CategoryRepository } from "@core/Letters/domain";
import { CategoryApiRepository } from "@infraestructure/Letter/CategoryApiRepository";

export class CategoryUseCase {
  protected apiRepository: CategoryRepository;
  constructor(uniqueId: string) {
    this.apiRepository = new CategoryApiRepository(uniqueId);
  }
  async createCategory(name: string): Promise<Category> {
    return this.apiRepository.createCategory(name);
  }
  async updateCategory(category: Category): Promise<Category> {
    return this.apiRepository.updateCategory(category);
  }
}
