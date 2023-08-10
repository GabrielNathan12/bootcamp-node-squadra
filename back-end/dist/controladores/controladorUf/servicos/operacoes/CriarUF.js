"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarUF = void 0;
const ErrosDaAplicacao_1 = require("../../../../errosAplicacao/ErrosDaAplicacao");
const Servicos_1 = require("../Servicos");
class CriarUF extends Servicos_1.Servicos {
    constructor(repositorio) {
        super(repositorio);
    }
    async criarNovoUF({ nome, sigla, status }, requisicao, resposta) {
        try {
            const repositorioUF = this.obterRepositorioUF();
            await this.validarTodosOsCampus({ nome, sigla, status });
            const novoUf = repositorioUF.create({
                nome: nome, sigla: sigla, status: status
            });
            await repositorioUF.save(novoUf);
            return resposta.status(200).json(await this.listarUfs());
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
exports.CriarUF = CriarUF;
