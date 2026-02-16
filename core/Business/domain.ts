export enum BusinessCoin {
  MXN = "Pesos Mexicanos",
  SOL = "Soles",
  COL = "Pesos colombianos",
}

export enum BusinessType {
  MATRIX = "MATRIZ",
  SUCURSAL = "SUCURSAL",
}

export type Business = {
  name: string;
  userId: string;
  uniqueId: string;
  parentId?: string;
  direction?: string;
  phone?: string;
  tabNumber?: number;
  logo?: string;
  plan?: string;
  currencyType?: BusinessCoin;
  isIncludeTax?: boolean;
  showTaxesInTicket?: boolean;
  type: BusinessType;
};

export interface BusinessRepository {
  createDefaultBusiness(name: string): Promise<Business>;
  createBusiness(business: Business): Promise<Business>;
  getBusiness(): Promise<Business>;
}
