import { Business, BusinessRepository } from "@core/Business/domain";
import { BusinessApiRepository } from "@infraestructure/Business/BusinessApiRepository";

export class BusinessUseCases {
  protected apiRepository: BusinessRepository;
  constructor(userId: string) {
    this.apiRepository = new BusinessApiRepository(userId);
  }
  async createDefaultBusiness(name: string): Promise<Business> {
    return this.apiRepository.createDefaultBusiness(name);
  }
  async createBusiness(business: Business): Promise<Business> {
    return this.apiRepository.createBusiness(business);
  }
}
