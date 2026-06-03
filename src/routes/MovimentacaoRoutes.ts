import { Router } from "express";
import { MovimentacaoController } from './../controller/MovimentacaoController';


const movimentacaoRoutes = Router();

const movimentacaoController =
    new MovimentacaoController();

movimentacaoRoutes.post(
    "/movimentacoes",
    movimentacaoController.create.bind(
        movimentacaoController
    )
);

movimentacaoRoutes.get(
    "/movimentacoes",
    movimentacaoController.listAll.bind(
        movimentacaoController
    )
);

movimentacaoRoutes.get(
    "/movimentacoes/:id",
    movimentacaoController.listById.bind(
        movimentacaoController
    )
);

//movimentacaoRoutes.put(
  //  "/movimentacoes/:id",
  //  movimentacaoController.update.bind(
  //      movimentacaoController
  //  )
//);

//movimentacaoRoutes.delete(
//    "/movimentacoes/:id",
//    movimentacaoController.delete.bind(
//        movimentacaoController
//    )
//);

export default movimentacaoRoutes;