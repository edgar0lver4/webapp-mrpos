import { USER_STATUS, USER_TYPES } from "./enum";

export type User = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  typeOfRestaurant: string;
  country: string;
  status: USER_STATUS;
  uniqueId: string;
  tokenSigin: string;
  modules: Array<string>;
  password: string;
  businessName: string;
  type: USER_TYPES;
};

export interface UserRepository {
  getUserByEmail(email: string): Promise<User>;
  getUserByEmailAndPassword(email: string, password: string): Promise<User>;
}
