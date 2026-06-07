import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { JoinColumn } from "typeorm";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { Produtos } from "./Produtos";
import { Endereco } from "./Endereco";
//import { Usuario } from "./Usuario";

export enum Status {
  ENT = "entrada",
  SD = "saida",
}

@Entity("movimentacao")
export class Movimentacao {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Produtos, (produto: Produtos) => produto.movimentacao)
  @JoinColumn({ name: "produtoId" })
  produto!: Produtos;

  //@IsNotEmpty()
  //@ManyToOne(() => Usuario, (usuario: Usuario) => usuario.movimentacoes)
  //@JoinColumn({ name: "usuarioId" })
  //usuario!: Usuario;

  @ManyToOne(() => Endereco, (endereco) => endereco.movimentacoes)
  @JoinColumn({ name: "enderecoId" })
  endereco!: Endereco;

  @Column({ type: "enum", enum: Status })
  status!: Status;

  @IsNotEmpty()
  @IsNumber()
  @Column("int")
  quantidade!: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  dataEntrada!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  dataSaida!: Date;

  @IsNotEmpty()
  @IsString()
  @Column("varchar")
  observacoes!: string;
}
