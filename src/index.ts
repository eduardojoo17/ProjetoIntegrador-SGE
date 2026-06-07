import express from "express";
import type { Application } from "express";
import { AppDataSource } from "./data-source.js";
import { usuarioRoutes } from "./routes/usuarioRoutes.js";
import { enderecoRoutes } from "./routes/enderecoRoutes.js";
import { ProdutosRoutes } from "./routes/ProdutosRoutes.js";
import { authRoutes } from "./routes/AuthRoutes.js";

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/enderecos", enderecoRoutes);
app.use("/api/produtos", ProdutosRoutes);
app.use("/api/auth", authRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado!");
    app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => console.log("Erro ao conectar no banco: ", error));
