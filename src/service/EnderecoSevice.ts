import { validate } from "class-validator";
import { AppDataSource } from "../data-source";
import { Endereco } from "../entity/Endereco";
import { NotFoundError } from "routing-controllers";
import { BadRequestError } from "../helpers/apiError";

export class EnderecoService {
  private enderecoRepository = AppDataSource.getRepository(Endereco);

  list = async () => {
    return await this.enderecoRepository.find();
  };

  create = async (
    rua: number,
    coluna: number,
    nivel: number,
    capacidadeMaxima: number,
  ) => {
    const novoEndereco = this.enderecoRepository.create({
      rua,
      coluna,
      nivel,
      capacidadeMaxima,
    });
    return await this.enderecoRepository.save(novoEndereco);
  };

  async update(id: number, data: Partial<Endereco>): Promise<Endereco | null> {
    const endereco = await this.enderecoRepository.findOneBy({ id });
    if (!endereco) throw new NotFoundError("Endereço não encontrado");
    const enderecoAtualizado = this.enderecoRepository.merge(endereco, data);
    return await this.enderecoRepository.save(enderecoAtualizado);
  }

  async delete(id: number): Promise<{ message: string }> {
    const usuario = await this.enderecoRepository.findOneBy({ id });
    if (!usuario) throw new NotFoundError("Usuario não encontrado");
    await this.enderecoRepository.remove(usuario);
    return { message: "Endereço deletado com sucesso" };
  }
}
