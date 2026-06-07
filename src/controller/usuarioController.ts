import type { Request, Response, NextFunction } from "express";
import { UsuarioService } from "../service/usuarioService";

export class UsuarioController {
  private usuarioService = new UsuarioService();

  listar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuarios = await this.usuarioService.list();
      return res.status(200).json(usuarios);
    } catch (error) {
      next(error);
    }
  };

  buscar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const usuario = await this.usuarioService.update;
      return res.status(200).json(usuario);
    } catch (error) {
      next(error);
    }
  };

  atualizar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const usuario = await this.usuarioService.update(id, req.body);
      return res.status(200).json(usuario);
    } catch (error) {
      next(error);
    }
  };

  remover = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await this.usuarioService.delete(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
