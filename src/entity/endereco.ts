import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum EnderecoStatus {
  LIVRE = "livre",
  OCUPADO = "ocupado",
  RESERVADO = "reservado",
  EM_MOVIMENTACAO = "em_movimentacao",
  BLOQUEADO = "bloqueado",
}

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn()
  id_endereco!: number;

  @Column("varchar")
  @IsNotEmpty({ message: "O campo de 'rua' é obrigatório" })
  @IsString({ message: "Este campo deve ser um texto!" })
  rua!: string;

  @Column("integer")
  @IsNotEmpty({ message: "O campo 'coluna' é obrigatório" })
  coluna!: number;

  @Column("integer")
  @IsNotEmpty({ message: "O campo 'nivel' é obrigatório!" })
  nivel!: number;

  @Column("integer", { nullable: true })
  capacidadeMaxima!: number;

  @Column("integer", { nullable: true })
  ocupacaoAtual!: number;

  @Column({ type: "enum", enum: EnderecoStatus, default: EnderecoStatus.LIVRE })
  @IsNotEmpty()
  @IsEnum(EnderecoStatus, {
    message:
      "Status inválido('livre, ocupado, reservado, em_movimentacao, bloqueado')",
  })
  enderecoStatus: EnderecoStatus;
}
