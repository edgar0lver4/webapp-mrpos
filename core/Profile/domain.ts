export interface ProfileRepository {
  terminateRegister: (token: string) => Promise<boolean>;
}
