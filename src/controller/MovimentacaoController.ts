import { Request, Response } from "express";
import { MovimentacaoService } from "../service/MovimentacaoService"; // ajuste o caminho se necessário

export class MovimentacaoController {
    private movimentacaoService: MovimentacaoService;

    constructor() {
        this.movimentacaoService = new MovimentacaoService();
    }

    async create(req: Request, res: Response) {
        const movimentacao = await this.movimentacaoService.create(req.body);
        return res.status(201).json(movimentacao);
    }

    async listAll(req: Request, res: Response) {
        const movimentacoes = await this.movimentacaoService.listAll();
        return res.status(200).json(movimentacoes);
    }

    async listById(req: Request, res: Response) {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ message: "ID inválido" });

        const movimentacao = await this.movimentacaoService.listById(id);
        if (!movimentacao) return res.status(404).json({ message: "Movimentação não encontrada" });

        return res.status(200).json(movimentacao);
    }

//  async update(req: Request, res: Response) {
//      const id = Number(req.params.id);
    //  if (Number.isNaN(id)) return res.status(400).json({ message: "ID inválido" });

        //const movimentacao = await this.movimentacaoService.update(id, req.body);
        //return res.status(200).json(movimentacao);
    //}

    //async delete(req: Request, res: Response) {
        //const id = Number(req.params.id);
        //if (Number.isNaN(id)) return res.status(400).json({ message: "ID inválido" });

        //await this.movimentacaoService.delete(id);
        //return res.status(204).send();
    //}
}