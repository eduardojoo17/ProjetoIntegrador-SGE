import type { Request, Response, NextFunction } from "express";
import { UsuarioService } from "../service/usuarioService";

const usuarioService = new UsuarioService();

export class UsuarioController {

  static criar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const novoUsuario = await usuarioService.create(req.body);
      const { senha: _, ...usuarioSemSenha } = novoUsuario as typeof novoUsuario & { senha: string };
      return res.status(201).json(usuarioSemSenha);
    } catch (erro: unknown) {
      next(erro);
    }
  };

  static listarTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuarios = await usuarioService.findAll();
      return res.status(200).json(usuarios);
    } catch (erro: unknown) {
      next(erro);
    }
  };

  static buscarPorId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = String(req.params.id);

      const usuario = await usuarioService.findOne(id);
      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      return res.status(200).json(usuario);
    } catch (erro: unknown) {
      next(erro);
    }
  };

  static atualizar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = String(req.params.id);

      const usuario = await usuarioService.update(id, req.body);
      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      const { senha: _, ...usuarioSemSenha } = usuario as typeof usuario & { senha: string };
      return res.status(200).json(usuarioSemSenha);
    } catch (erro: unknown) {
      next(erro);
    }
  };

  static remover = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = String(req.params.id);

      const removido = await usuarioService.delete(id);
      if (!removido) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      return res.status(204).send();
    } catch (erro: unknown) {
      next(erro);
    }
  };
}