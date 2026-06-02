import { AppDataSource } from "../data-source";
import { Movimentacao } from "../entity/Movimentacao";
import { Produtos } from "../entity/Produto";

//import { Usuario } from "../entity/Usuario";

export class MovimentacaoService {

    private movimentacaoRepository =
        AppDataSource.getRepository(Movimentacao);

    private produtoRepository =
        AppDataSource.getRepository(Produtos);

    private usuarioRepository =
        AppDataSource.getRepository(Usuario);

    create = async (data: Partial<Movimentacao>) => {

        const produto =
            await this.produtoRepository.findOne({
                where: { id: data.produto?.id }
            });

        if (!produto) {
            throw new Error("Produto não encontrado");
        }

        const usuario =
            await this.usuarioRepository.findOne({
                where: { id: data.usuario?.id }
            });

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        if (data.status === "SAIDA") {

            if (produto.endereco < Number(data.quantidade)) {
                throw new Error(
                    "endereco insuficiente"
                );
            }

            produto.endereco =
                produto.endereco -
                Number(data.quantidade);

        } else if (data.status === "ENTRADA") {

            produto.endereco =
                produto.endereco +
                Number(data.quantidade);

        }

        await this.produtoRepository.save(produto);

        const movimentacao =
            this.movimentacaoRepository.create({
                ...data,
                dataHora: new Date()
            });

        return await this.movimentacaoRepository.save(
            movimentacao
        );
    };

    listAll = async () => {

        return await this.movimentacaoRepository.find({
            relations: [
                "produto",
                "usuario"
            ]
        });

    };

    listById = async (id: number) => {

        return await this.movimentacaoRepository.findOne({
            where: { id },
            relations: [
                "produto",
                "usuario"
            ]
        });

    };

    update = async (
        id: number,
        data: Partial<Movimentacao>
    ) => {

        const movimentacao =
            await this.listById(id);

        if (!movimentacao) {
            throw new Error(
                "Movimentação não encontrada"
            );
        }

        Object.assign(
            movimentacao,
            data
        );

        return await this.movimentacaoRepository.save(
            movimentacao
        );
    };

    delete = async (id: number) => {

        throw new Error(
            "Movimentações não podem ser excluídas para preservar o histórico."
        );

    };

}