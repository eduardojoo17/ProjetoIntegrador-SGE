import { CargoUsuario } from "../entity/usuario";

declare global {
  namespace Express {
    interface Request {
      user_id?: string;
      user_role?: CargoUsuario;
    }
  }
}

export {};