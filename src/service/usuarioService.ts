import { AppDataSource } from "../data-source.js";
import { Usuario } from "../entity/usuario.js";

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
    if (!usuario) {
      return null;
    }
    Object.assign(usuario, usuarioData);
    return await this.usuarioRepository.save(usuario);
  }

  async delete(id: string): Promise<boolean> {
    const usuario = await this.usuarioRepository.findOneBy({ id: id as unknown as string });
    if (!usuario) {
      return false;
    }
    await this.usuarioRepository.remove(usuario);
    return true;
  }
}