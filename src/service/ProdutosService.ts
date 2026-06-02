import { Repository } from "typeorm";
import { Produtos } from "../entity/Produtos";
import { AppDataSource } from "../data-source";
import { NotFoundError } from "routing-controllers";
 
export class ProdutosService {
  private repo: Repository<Produtos>;
 
  constructor() {
    this.repo = AppDataSource.getRepository(Produtos);
  }
 
  async findAll(): Promise<Produtos[]> {
    return this.repo.find();
  }
 
  async findById(id: number): Promise<Produtos | null> {
    return this.repo.findOneBy({ id });
  }
 
  async create(data: Partial<Produtos>): Promise<Produtos> {
    const produto = this.repo.create({
      ...data,
      criadoEm: new Date(),
    });
    return this.repo.save(produto);
  }
 
  async update(id: number, data: Partial<Produtos>): Promise<Produtos | null> {
    const produto = await this.repo.findOneBy({ id });
    if (!produto) throw new NotFoundError("Produto não encontrado")
 
    Object.assign(produto, data);
    return this.repo.save(produto);
  }
 
  async delete(id: number): Promise<{ message: string }> {
    const produto = await this.repo.findOneBy({ id });
    if (!produto) throw new NotFoundError("Produto não encontrado");
  
    await this.repo.delete(id); 
    return { message: "Produto deletado com sucesso" };
  }

 
  async toggleAtivo(id: number): Promise<Produtos | null> {
    const produto = await this.repo.findOneBy({ id });
    if (!produto) throw new NotFoundError("Produto não encontrado")
 
    produto.ativo = !produto.ativo;
    return this.repo.save(produto);
  }
}