import { Repository } from "typeorm";
import { Produtos } from "../entity/Produtos";
import { AppDataSource } from "../data-source";
 
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
    if (!produto) return null;
 
    Object.assign(produto, data);
    return this.repo.save(produto);
  }
 
  async remove(id: number): Promise<boolean> {
    const produto = await this.repo.findOneBy({ id });
    if (!produto) return false;
 
    await this.repo.remove(produto);
    return true;
  }
 
  async toggleAtivo(id: number): Promise<Produtos | null> {
    const produto = await this.repo.findOneBy({ id });
    if (!produto) return null;
 
    produto.ativo = !produto.ativo;
    return this.repo.save(produto);
  }
}