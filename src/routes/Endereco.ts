import { Router } from "express";
import { EnderecoController } from "../controller/EnderecoController";

const router = Router();
const enderecoController = new EnderecoController();

router.get("/", enderecoController.listAll);
router.post("/", enderecoController.create);
router.patch("/:id", enderecoController.update);
router.delete("/:id", enderecoController.delete);

export const enderecoRoutes = router;