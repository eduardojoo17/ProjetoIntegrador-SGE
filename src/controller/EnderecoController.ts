import { Request, Response, NextFunction } from "express";
import { EnderecoService } from "../service/EnderecoSevice";

export class EnderecoController {
  private enderecoService = new EnderecoService();

  listAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const enderecos = await this.enderecoService.list();
      return res.status(200).json(enderecos);
    } catch (error: unknown) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { rua, coluna, nivel, capacidadeMaxima } = req.body;
      const novoEndereco = await this.enderecoService.create(
        rua,
        coluna,
        nivel,
        capacidadeMaxima,
      );
      return res.status(201).json(novoEndereco);
    } catch (error: unknown) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const dados = req.body;
      const enderecoAtualizado = await this.enderecoService.update(id, dados);
      return res.status(200).json(enderecoAtualizado);
    } catch (error: unknown) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await this.enderecoService.delete(id);
      return res.status(204).send();
    } catch (error: unknown) {
      next(error);
    }
  };
}
