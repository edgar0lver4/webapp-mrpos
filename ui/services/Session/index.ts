import { API_BASE } from "@infraestructure/Urls";
import axios from "axios";

export class SessionService {
  async logout() {
    try {
      await axios.delete(`${API_BASE}/session`);
    } catch (e) {
      throw new Error("Error al cerrar sesión");
    }
  }

  async login(email: string, password: string): Promise<number> {
    try {
      const payload = {
        email,
        password,
      };
      const { status } = await axios.post(`${API_BASE}/session`, payload);
      return status;
    } catch (e) {
      throw new Error("Error al iniciar sesión");
    }
  }
}
