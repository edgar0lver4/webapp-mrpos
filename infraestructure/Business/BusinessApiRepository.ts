import { FirebaseUseCases } from "@application/Firebase/FirebaseUseCases";
import { SecurityUseCases } from "@application/Security/SecurityUseCases";
import {
  Business,
  BusinessRepository,
  BusinessType,
} from "@core/Business/domain";
import { DB_CORE_NAMES } from "@core/Database/Core";

export class BusinessApiRepository implements BusinessRepository {
  protected userId;
  protected security;
  protected dbController;
  constructor(userId: string) {
    this.userId = userId;
    this.security = new SecurityUseCases();
    this.dbController = new FirebaseUseCases(DB_CORE_NAMES.BUSINESS);
  }

  async createDefaultBusiness(name: string): Promise<Business> {
    const uniqueId = this.security.generateRandomId();
    const payload: Business = {
      name,
      uniqueId,
      userId: this.userId,
      type: BusinessType.MATRIX,
    };
    return this.createBusiness(payload);
  }

  async createBusiness(business: Business): Promise<Business> {
    try {
      await this.dbController.insert(business);
      return business;
    } catch (e) {
      throw new Error("Error al crear el negocio");
    }
  }
}
