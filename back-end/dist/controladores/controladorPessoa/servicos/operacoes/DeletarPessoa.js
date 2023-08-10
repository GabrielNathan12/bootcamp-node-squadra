"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletarPessoa = void 0;
const Servicos_1 = require("../Servicos");
const ErrosDaAplicacao_1 = require("../../../../errosAplicacao/ErrosDaAplicacao");
class DeletarPessoa extends Servicos_1.Servicos {
    constructor(repositorio) {
        super(repositorio);
    }
    async deletarPessoa({ codigoPessoa }, requisicao, resposta) {
        try {
            const pessoaRepositorio = this.obterRepositorioPessoa();
            const pessoa = await pessoaRepositorio.findOne({ where: { codigoPessoa: codigoPessoa } });
            if (!pessoa) {
                throw new ErrosDaAplicacao_1.ErrosDaAplicacao("Pessoa nao cadastrada", 400);
            }
            await pessoaRepositorio.remove(pessoa);
            const pessoas = await pessoaRepositorio.find({
                select: ["codigoPessoa", "nome", "sobrenome", "idade", "login", "senha", "status", "enderecos"],
                relations: ["enderecos"]
            });
            const todasAsPessoas = this.listarTodasPessoas(pessoas);
            return resposta.status(200).json(todasAsPessoas);
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
exports.DeletarPessoa = DeletarPessoa;
