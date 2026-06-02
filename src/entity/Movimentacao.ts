import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, Column } from "typeorm";
import { JoinColumn } from "typeorm";
import { IsNotEmpty, IsString, IsNumber  } from "class-validator";

export enum Status {
  DISP = "disponivel",
  ND = "Não disponível",
}


@Entity("movimentacao")
export class Movimentacao {
    @PrimaryGeneratedColumn()
    id!: number;

    @IsNotEmpty()
    @IsNumber()
    @ManyToOne(() => Produto, produto => produto.movimentacoes)
    @JoinColumn({ name: "produtoId" })
    produtoId!: Produto;

    @IsNotEmpty()
    @IsNumber()
    @ManyToOne(() => Usuario, usuario => usuario.movimentacoes)
    @JoinColumn({ name: "usuarioId" })
    usuarioId!: Usuario;

    @Column({ type: "enum", enum: Status, default: Status.DISP })
    status!: Status;

    @IsNotEmpty()
    @IsString()
    @Column("string")
    endereco!: string;

    @IsNotEmpty()
    @IsString()
    @Column("string")
    quantidade!: string;
    
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    dataEntrada!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    dataSaida!: Date;
    
    @IsNotEmpty()
    @IsString()
    @Column("string")
    observacoes!: string;
}