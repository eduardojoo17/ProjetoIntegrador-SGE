import { Router } from "express";
import { ProdutosController } from "../controller/PreodutosController";
 
const router = Router();
const controller = new ProdutosController();
 

 
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
router.patch("/:id/toggle-ativo", controller.toggleAtivo);
 
export default router;