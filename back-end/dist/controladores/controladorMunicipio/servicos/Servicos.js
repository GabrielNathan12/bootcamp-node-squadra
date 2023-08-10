"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Servicos = void 0;
const ErrosDaAplicacao_1 = require("../../../errosAplicacao/ErrosDaAplicacao");
class Servicos {
    constructor(repositorios) {
        this.repositorios = repositorios;
    }
    obterRepositorioMunicipio() {
        return this.repositorios.municipioRepositorio;
    }
    obterRepositorioUf() {
        return this.repositorios.ufRepositorio;
    }
    async validaTodosOsCampus({ codigoUF, nome, status }) {
        const repositorioMunicipio = this.obterRepositorioMunicipio();
        const repositorioUF = this.obterRepositorioUf();
        const ufExiste = await repositorioUF.findOne({ where: { codigoUF: codigoUF } });
        if (!codigoUF || isNaN(codigoUF)) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao(`Campo codigoUF invalido, Motivo: ${codigoUF}`, 400);
        }
        if (!nome) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Campo nome nao encontrado', 400);
        }
        if (!status || isNaN(status) || !this.verificaStatusValido(status)) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao(`Status do campo invalido: Motivo = ${status}`, 400);
        }
        const municipioExiste = await repositorioMunicipio.createQueryBuilder("Municipio")
            .where("Municipio.nome = :nome", { nome: nome })
            .andWhere("Municipio.codigoUF = :codigoUF", { codigoUF: codigoUF })
            .getOne();
        if (!ufExiste) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('codigoUF nao encontrado no Banco de Dados', 400);
        }
        if (municipioExiste) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Municipio ja cadastrado nesse UF', 400);
        }
    }
    listarMunicipios(municipios) {
        return municipios.map((municipio) => ({
            codigoMunicipio: municipio.codigoMunicipio,
            codigoUF: municipio.uf.codigoUF,
            nome: municipio.nome,
            status: municipio.status
        }));
    }
    verificaStatusValido(status) {
        return status === 1 || status === 2;
    }
}
exports.Servicos = Servicos;
