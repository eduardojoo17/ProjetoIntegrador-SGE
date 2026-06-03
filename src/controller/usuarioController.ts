import type { Request, Response, NextFunction } from "express";
import { UsuarioService } from "../service/UsuarioService";

const usuarioService = new UsuarioService();

export class UsuarioController {

   criar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const novoUsuario = await usuarioService.create(req.body);
      const { senha: _, ...usuarioSemSenha } = novoUsuario as typeof novoUsuario & { senha: string };
      return res.status(201).json(usuarioSemSenha);
    } catch (error: unknown) {
      next(error);
    }
  };

   listarTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuarios = await usuarioService.findAll();
      return res.status(200).json(usuarios);
    } catch (error: unknown) {
      next(error);
    }
  };

   buscarPorId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = String(req.params.id);

      const usuario = await usuarioService.findOne(id);
      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      return res.status(200).json(usuario);
    } catch (error: unknown) {
      next(error);
    }
  };

   atualizar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = String(req.params.id);

      const usuario = await usuarioService.update(id, req.body);
      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      const { senha: _, ...usuarioSemSenha } = usuario as typeof usuario & { senha: string };
      return res.status(200).json(usuarioSemSenha);
    } catch (error: unknown) {
      next(error);
    }
  };

   remover = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = String(req.params.id);

      const removido = await usuarioService.delete(id);
      if (!removido) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      return res.status(204).send();
    } catch (error: unknown) {
      next(error);
    }
  };
}