import { NotFoundError } from "routing-controllers";
import { AppDataSource } from "../data-source.js";
import { Usuario } from "../entity/Usuario.js";

export class UsuarioService {
  private usuarioRepository = AppDataSource.getRepository(Usuario);

  async create(usuarioData: Partial<Usuario>): Promise<Usuario> {
    const usuario = this.usuarioRepository.create(usuarioData);
    return await this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findOne(id: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOneBy({ id: id as unknown as string });
  }

  async update(id: string, usuarioData: Partial<Usuario>): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository.findOneBy({ id: id as unknown as string });
    if (!usuario) throw new NotFoundError("Usuario não encontrado");
    Object.assign(usuario, usuarioData);
    return await this.usuarioRepository.save(usuario);
  }

  async delete(id: string): Promise<{ message: string }> {
    const usuario = await this.usuarioRepository.findOneBy({ id: id as unknown as string });
    if (!usuario) throw new NotFoundError("Usuario não encontrado");
    await this.usuarioRepository.remove(usuario);
    return { message: "Produto deletado com sucesso" };
  }
}