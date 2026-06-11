import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Movimentacao } from "./Movimentacao.js";
import { Produtos } from "./Produtos.js";

export enum EnderecoStatus {
  LIVRE = "LIVRE",
  OCUPADO = "OCUPADO",
  BLOQUEADO = "BLOQUEADO",
}

@Entity("enderecos")
@Unique(["rua", "coluna", "nivel"])
export class Endereco {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "integer" })
  rua!: number;

  @Column({ type: "integer" })
  coluna!: number;

  @Column({ type: "integer" })
  nivel!: number;

  @Column({ type: "integer" })
  capacidadeMaxima!: number;

  @Column({ type: "integer", default: 0 })
  ocupacaoAtual!: number;

  @Column({ type: "enum", enum: EnderecoStatus, default: EnderecoStatus.LIVRE })
  status!: EnderecoStatus;

  @ManyToOne(() => Produtos, (produto) => produto.enderecos, { nullable: true }) // <-- Ajustado aqui!
  produto!: Produtos | null;

  @OneToMany(() => Movimentacao, (movimentacao) => movimentacao.endereco)
  movimentacoes!: Movimentacao[];
}
