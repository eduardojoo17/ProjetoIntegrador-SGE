import { Router } from "express";
import { ProdutosController } from "../controller/ProdutosController";
 
const router = Router();
const controller = new ProdutosController();
 

 
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.patch("/:id/toggle-ativo", controller.toggleAtivo);
 
export const ProdutosRoutes =  router;