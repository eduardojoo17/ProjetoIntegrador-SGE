import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    
  }