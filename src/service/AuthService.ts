import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source.js";
import { Usuario } from "../entity/usuario.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../helpers/apiError.js";
import { validate } from "class-validator";

export class AuthService {
  private usuRepository = AppDataSource.getRepository(Usuario);

  registrar = async (dados: {
    nome: string;
    email: string;
    senha: string;
    role?: "admin" | "usuario";
  }) => {
    const existe = await this.usuRepository.findOneBy({ email: dados.email });
    if (existe) throw new ConflictError("email já cadastrado");
    const hash = await bcrypt.hash(dados.senha, 4);
    const usuario = this.usuRepository.create({ ...dados, senha: hash });
    const errors = await validate(usuario, {
      skipMissingProperties: true,
    });
    if (errors.length > 0)
      throw new BadRequestError("Falha de validação", errors);
    return await this.usuRepository.save(usuario);
  };

  logar = async (email: string, senha: string) => {
    const usuario = await this.usuRepository.findOne({
      where: { email },
      select: ["id", "email", "senha", "role"],
    });
    if (!usuario) throw new NotFoundError("Login ou senha incorretos");

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) throw new NotFoundError("Login ou senha invalidos");

    const token = jwt.sign(
      { id: usuario.id, role: usuario.role },
      process.env.JWT as string,
      { expiresIn: "8h" },
    );

    return { token };
  };
}
