import { USER_TYPES } from "@core/User/enum";

export type ProfileSession = {
  email: string;
  userType: USER_TYPES;
  userId: string;
  businessId: string;
};
export interface ProfileRepository {
  terminateRegister: (token: string) => Promise<string>;
  sessionStart(email: string, password: string): Promise<string>;
}
