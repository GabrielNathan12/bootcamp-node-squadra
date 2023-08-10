"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtualizarUF = void 0;
const Servicos_1 = require("../Servicos");
const ErrosDaAplicacao_1 = require("../../../../errosAplicacao/ErrosDaAplicacao");
class AtualizarUF extends Servicos_1.Servicos {
    constructor(repositorio) {
        super(repositorio);
    }
    async validarTodosOsCampus({ codigoUF, nome, sigla, status }) {
        const repositorioUF = this.obterRepositorioUF();
        if (!codigoUF || isNaN(codigoUF)) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao(`Campo codigoUF invalido, Motivo: ${codigoUF}`, 400);
        }
        if (!nome) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Campo nome nao encontrado', 400);
        }
        if (!sigla) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Campo sigla nao encontrado', 400);
        }
        if (!status || isNaN(status) || !this.verificaStatusValido(Number(status))) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao(`Status do campo invalido: Motivo = ${status}`, 400);
        }
        if (!this.verificaSiglaValida(sigla)) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Sigla invalida', 400);
        }
        const uf = await repositorioUF.findOne({ where: { codigoUF: codigoUF } });
        if (!uf) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('UF nao encontrado no Banco de Dados', 400);
        }
        const ufNome = await repositorioUF.findOne({ where: { nome: nome } });
        if (ufNome && nome !== uf.nome) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('UF ja cadastrado no Banco de Dados', 400);
        }
        const ufSigla = await repositorioUF.findOne({ where: { sigla: sigla } });
        if (ufSigla && sigla !== uf.sigla) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Sigla ja cadastrado no Banco de Dados', 400);
        }
        uf.nome = nome;
        uf.sigla = sigla;
        uf.status = status;
        await this.obterRepositorioUF().save(uf);
    }
    async atualizarUf({ codigoUF, nome, sigla, status }, requisicao, resposta) {
        try {
            await this.validarTodosOsCampus({ codigoUF, nome, sigla, status });
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
exports.AtualizarUF = AtualizarUF;
