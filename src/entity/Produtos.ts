import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movimentacao } from "./Movimentacao";

 @Entity()
  export class Produtos {
    @PrimaryGeneratedColumn()
    id!: number;
   
    @Column({ type: "varchar"})
    nome!: string;
   
    @Column({ type: "varchar", unique: true, nullable: false  })
    descricao!: string;
   
    @Column({ type: "boolean", default: true })
    ativo!: boolean;

    @Column({ type: "timestamp" })
    criadoEm!: Date

    @OneToMany(() => Movimentacao, (movimentacao: Movimentacao) => movimentacao.produto)
    movimentacao!: Movimentacao[];
    
  }