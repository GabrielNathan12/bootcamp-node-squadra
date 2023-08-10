"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletarEndereco = void 0;
const Servicos_1 = require("../Servicos");
const ErrosDaAplicacao_1 = require("../../../../errosAplicacao/ErrosDaAplicacao");
class DeletarEndereco extends Servicos_1.Servicos {
    constructor(repositorio) {
        super(repositorio);
    }
    async deletarEndereco({ codigoEndereco }, requisicao, resposta) {
        try {
            const enderecoReposito = this.obterRepositorioEndereco();
            const enderecoExiste = await enderecoReposito.findOne({ where: { codigoEndereco: Number(codigoEndereco) } });
            if (!enderecoExiste) {
                throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Endereco nao existe', 400);
            }
            await enderecoReposito.remove(enderecoExiste);
            const enderecos = await enderecoReposito.find({
                select: ["codigoEndereco", "pessoa", "bairro", "nomeRua", "numero", "complemento", "cep"],
                relations: ["pessoa", "bairro"]
            });
            const todosEnderecos = this.listarTodosEnderecos(enderecos);
            return resposta.status(200).json(todosEnderecos);
        }
        catch (error) {
            if (error instanceof ErrosDaAplicacao_1.ErrosDaAplicacao) {
                return resposta.status(error.status).json({ mensagem: error.message, status: error.status });
            }
            else {
                return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error });
            }
        }
    }
}
exports.DeletarEndereco = DeletarEndereco;
