import { Category, CategoryRepository } from "@core/Letters/domain";
import { CategoryApiRepository } from "@infraestructure/Letter/CategoryApiRepository";

export class CategoryUseCase {
  protected apiRepository: CategoryRepository;
  constructor(businessId: string) {
    this.apiRepository = new CategoryApiRepository(businessId);
  }
  async createCategory(name: string): Promise<Category> {
    return this.apiRepository.createCategory(name);
  }
  async updateCategory(category: Category): Promise<Category> {
    return this.apiRepository.updateCategory(category);
  }
  async getAllCategories(): Promise<Category[]> {
    return this.apiRepository.getAllCategories();
  }
}
