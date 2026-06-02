import { Request, Response } from "express";
import { ProdutosService } from "../service/ProdutosService";
 
export class ProdutosController {
  private service: ProdutosService;
 
  constructor() {
    this.service = new ProdutosService();
  }
 
  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const produtos = await this.service.findAll();
      res.status(200).json(produtos);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar produtos", error });
    }
  };
 
  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const produto = await this.service.findById(id);
 
      if (!produto) {
        res.status(404).json({ message: "Produto não encontrado" });
        return;
      }
 
      res.status(200).json(produto);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar produto", error });
    }
  };
 
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nome, descricao, ativo } = req.body;
 
      if (!nome || !descricao) {
        res.status(400).json({ message: "nome e descricao são obrigatórios" });
        return;
      }
 
      const produto = await this.service.create({ nome, descricao, ativo });
      res.status(201).json(produto);
    } catch (error: any) {
      if (error?.code === "23505") {
        res.status(409).json({ message: "Descrição já cadastrada" });
        return;
      }
      res.status(500).json({ message: "Erro ao criar produto", error });
    }
  };
 
  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const { nome, descricao, ativo } = req.body;
 
      const produto = await this.service.update(id, { nome, descricao, ativo });
 
      if (!produto) {
        res.status(404).json({ message: "Produto não encontrado" });
        return;
      }
 
      res.status(200).json(produto);
    } catch (error: any) {
      if (error?.code === "23505") {
        res.status(409).json({ message: "Descrição já cadastrada" });
        return;
      }
      res.status(500).json({ message: "Erro ao atualizar produto", error });
    }
  };
 
  remove = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const removed = await this.service.remove(id);
 
      if (!removed) {
        res.status(404).json({ message: "Produto não encontrado" });
        return;
      }
 
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Erro ao remover produto", error });
    }
  };
 
  toggleAtivo = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const produto = await this.service.toggleAtivo(id);
 
      if (!produto) {
        res.status(404).json({ message: "Produto não encontrado" });
        return;
      }
 
      res.status(200).json(produto);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar status", error });
    }
  };
}