"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Servicos = void 0;
const ErrosDaAplicacao_1 = require("../../../errosAplicacao/ErrosDaAplicacao");
class Servicos {
    constructor(repositorios) {
        this.repositorios = repositorios;
    }
    async validarTodosOsCampus({ codigoMunicipio, nome, status }) {
        const repositorioBairro = this.repositorios.bairroRepositorio;
        const repositorioMunicipio = this.repositorios.municipioRepositorio;
        if (!codigoMunicipio || isNaN(codigoMunicipio)) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Campo codigoMunicipio nao encontrado', 400);
        }
        if (!nome) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Campo nome nao encontrado', 400);
        }
        if (!status || isNaN(status) || !this.verificaStatusValido(Number(status))) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao(`Status do campo invalido: Motivo = ${status}`, 400);
        }
        const municipioExiste = await repositorioMunicipio.findOne({ where: { codigoMunicipio: codigoMunicipio } });
        if (!municipioExiste) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('codigoMunicipio nao encontrado no Banco de Dados', 400);
        }
        const bairroExiste = await repositorioBairro.createQueryBuilder("Bairro").where("Bairro.nome = :nome", { nome: nome })
            .andWhere("Bairro.codigoMunicipio = :codigoMunicipio", { codigoMunicipio: codigoMunicipio }).getOne();
        if (bairroExiste) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Bairro ja cadastrado nesse municipio', 400);
        }
    }
    obterRepositorio() {
        return this.repositorios.bairroRepositorio;
    }
    obterRepositorioMunicipio() {
        return this.repositorios.municipioRepositorio;
    }
    verificaStatusValido(status) {
        return status === 1 || status === 2;
    }
    listarBairros(bairros) {
        return bairros.map((bairro) => ({
            codigoBairro: bairro.codigoBairro,
            codigoMunicipio: bairro.municipio.codigoMunicipio,
            nome: bairro.nome,
            status: bairro.status
        }));
    }
}
exports.Servicos = Servicos;
