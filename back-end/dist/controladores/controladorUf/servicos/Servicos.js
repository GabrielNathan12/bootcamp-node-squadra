"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Servicos = void 0;
const ErrosDaAplicacao_1 = require("../../../errosAplicacao/ErrosDaAplicacao");
class Servicos {
    constructor(repositorios) {
        this.repositorios = repositorios;
    }
    obterRepositorioUF() {
        return this.repositorios.ufRepositorio;
    }
    async validarTodosOsCampus({ nome, sigla, status }) {
        const repositorioUF = this.obterRepositorioUF();
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
        const ufExiste = await repositorioUF.findOne({ where: { nome: nome } });
        const siglaExiste = await repositorioUF.findOne({ where: { sigla: sigla } });
        if (ufExiste) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Uf ja cadastrado no Banco de Dados', 400);
        }
        if (siglaExiste) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Sigla ja cadastarda no Banco de Dados', 400);
        }
    }
    verificaSiglaValida(sigla) {
        if (sigla.length === 2) {
            return true;
        }
        return false;
    }
    verificaStatusValido(status) {
        return status === 1 || status === 2;
    }
    async listarUfs() {
        const repositorioUF = this.repositorios.ufRepositorio;
        return await repositorioUF.find({});
    }
}
exports.Servicos = Servicos;
