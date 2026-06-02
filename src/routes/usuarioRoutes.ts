import { Router } from "express";
import { UsuarioController } from "../controller/usuarioController";
 
const rotasUsuario = Router();
 
rotasUsuario.get("/", UsuarioController.listarTodos);
rotasUsuario.get("/:id", UsuarioController.buscarPorId);
rotasUsuario.post("/", UsuarioController.criar);
rotasUsuario.put("/:id", UsuarioController.atualizar);
rotasUsuario.delete("/:id", UsuarioController.remover);
 
export default rotasUsuario;