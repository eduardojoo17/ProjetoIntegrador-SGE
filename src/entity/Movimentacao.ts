import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { JoinColumn } from "typeorm";
import { IsNotEmpty, IsString, IsNumber  } from "class-validator";
import { Produtos } from "./Produto";
//import { Usuario } from "./Usuario";

export enum Status {
  DISP = "disponivel",
  ND = "Não disponível",
}


@Entity("movimentacao")
export class Movimentacao {
    @PrimaryGeneratedColumn()
    id!: number;

    @IsNotEmpty()
    @ManyToOne(() => Produtos, (produto: Produtos) => produto.movimentacao)
    @JoinColumn({ name: "produtoId" })
    produto!: Produtos;

    @IsNotEmpty()
    @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.movimentacoes)
    @JoinColumn({ name: "usuarioId" })
    usuario!: Usuario;

    @Column({ type: "enum", enum: Status, default: Status.DISP })
    status!: Status;

    @IsNotEmpty()
    @IsString()
    @Column("varchar")
    endereco!: string;

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