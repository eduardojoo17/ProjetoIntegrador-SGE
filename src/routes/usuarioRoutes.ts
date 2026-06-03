import { Router } from "express";
import { UsuarioController } from "../controller/UsuarioController";

const router = Router();
const usuarioController = new UsuarioController();

router.post("/", usuarioController.criar);
router.get("/", usuarioController.listarTodos);
router.get("/:id", usuarioController.buscarPorId);
router.put("/:id", usuarioController.atualizar);
router.delete("/:id", usuarioController.remover);

export const usuarioRoutes = router;



