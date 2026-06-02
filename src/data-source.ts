import "reflect-metadata";
import { DataSource, type DataSourceOptions } from "typeorm";
import { Produtos } from "./entity/Produto";
import { Movimentacao } from "./entity/Movimentacao";

const options: DataSourceOptions = {
  type: (process.env.DB_TYPE as "postgres") || "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [Produtos, Movimentacao],
  migrations: [],
  subscribers: [],
};

export const AppDataSource = new DataSource(options);
