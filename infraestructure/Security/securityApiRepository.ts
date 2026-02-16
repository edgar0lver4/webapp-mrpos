import { ISecurityRepository } from "@core/security/domain";
import { pbkdf2Sync, randomBytes } from "crypto";
import jwt from "jsonwebtoken";

export class SecurityApiRepository implements ISecurityRepository {
  protected KEY_LENGTH = 32;
  protected IV_LENGTH = 16;
  protected SALT_LENGTH = 16;
  protected ITERATIONS = 10000;
  protected DIGEST = "sha256";
  protected ALGORITHM = "aes-256-cbc";
  protected JWT_SECRET =
    process.env.JWT_SECRET_KEY || "LA CUÑA QUE ACUÑO UNA CUÑA";

  encryptFormData = (body: any, pass: string) => {
    const satl = randomBytes(this.KEY_LENGTH);
    const iv = randomBytes(this.IV_LENGTH);
    const key = pbkdf2Sync(
      pass,
      satl,
      this.ITERATIONS,
      this.KEY_LENGTH,
      this.DIGEST
    );

    return "";
  };
  encryptText = () => {
    return "";
  };

  generateJWT(body: any): string {
    try {
      const token = jwt.sign(body, this.JWT_SECRET, { expiresIn: "1d" });
      return token;
    } catch (e) {
      console.log("Error al generar el JWT:", e);
      throw new Error("Error al generar el JWT");
    }
  }

  decriptJWT<T>(token: string): T {
    try {
      const data = jwt.verify(token, this.JWT_SECRET) as T;
      return data;
    } catch (e) {
      console.error("Error al generar el JWT:", e);
      throw new Error("Error al obtener la datos del usuario");
    }
  }
}
