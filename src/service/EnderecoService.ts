import { validate } from "class-validator";
import { AppDataSource } from "../data-source";
import { Endereco } from "../entity/Endereco";

export class EnderecoService {
  private enderecoRepository = AppDataSource.getRepository(Endereco);

  list = async () => {
    return await this.enderecoRepository.find();
  };

  create = async (rua: string, coluna: number, nivel: number) => {
    const novoEndereco = this.enderecoRepository.create({ rua, coluna, nivel });
    return await this.enderecoRepository.save(novoEndereco);
  };

  update = async (id: number, data: Partial<Endereco>) => {
    const endereco = await this.enderecoRepository.findOneBy({
      id_endereco: id,
    });
    const enderecoAtualizado = this.enderecoRepository.merge(endereco, data);
    return await this.enderecoRepository.save(enderecoAtualizado);
  };

  delete = async (id_endereco: number) => {
    const endereco = await this.enderecoRepository.findOneBy({ id_endereco });
    return await this.enderecoRepository.delete(id_endereco);
  };
}