export interface ISecurityRepository {
  encryptFormData: (body: any, pass: string) => string;
  encryptText: (body: any, pass: string) => string;
  generateJWT(body: any): string;
  decriptJWT<T>(body: string): T;
}
