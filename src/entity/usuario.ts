import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from "class-validator";

export enum CargoUsuario {
  ADMIN = "admin",
  USUARIO = "usuario",
}

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  @IsNotEmpty({ message: "O nome é obrigatório!" })
  @IsString({ message: "O nome precisa ser um texto" })
  nome!: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  @IsNotEmpty({ message: "O e-mail é obrigatório" })
  @IsEmail({}, { message: "O e-mail não é válido" })
  email!: string;

  @Column({ type: "varchar", select: false })
  @IsNotEmpty({ message: "A senha é obrigatória" })
  senha!: string;

  @Column({ type: "enum", enum: CargoUsuario, default: CargoUsuario.USUARIO })
  @IsNotEmpty({ message: "O cargo é obrigatório" })
  @IsEnum(CargoUsuario, { message: "Cargo inválido. Use 'admin' ou 'usuario'" })
  cargo!: CargoUsuario;

  @Column({ type: "boolean", default: true })
  @IsBoolean({ message: "O campo ativo deve ser verdadeiro ou falso" })
  ativo!: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  criadoEm!: Date;

}
