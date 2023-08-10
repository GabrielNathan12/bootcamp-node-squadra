"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtualizarMunicipio = void 0;
const ErrosDaAplicacao_1 = require("../../../../errosAplicacao/ErrosDaAplicacao");
const Servicos_1 = require("../Servicos");
class AtualizarMunicipio extends Servicos_1.Servicos {
    constructor(repositorios) {
        super(repositorios);
    }
    async validaTodosOsCampus({ codigoMunicipio, codigoUF, nome, status }) {
        if (!codigoMunicipio || isNaN(codigoMunicipio)) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao(`Campo codigoMunicipio inválido: ${codigoMunicipio}`, 400);
        }
        if (!codigoUF || isNaN(codigoUF)) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao(`Campo codigoUF inválido: ${codigoUF}`, 400);
        }
        if (!nome) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Campo nome não encontrado', 400);
        }
        if (!status || isNaN(status) || !this.verificaStatusValido(status)) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao(`Status do campo inválido: Motivo = ${status}`, 400);
        }
        const repositorioMunicipio = this.obterRepositorioMunicipio();
        const repositorioUF = this.obterRepositorioUf();
        const municipio = await repositorioMunicipio.findOne({ where: { codigoMunicipio: codigoMunicipio } });
        if (!municipio) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Município não cadastrado', 400);
        }
        const ufExiste = await repositorioUF.findOne({ where: { codigoUF: codigoUF } });
        if (!ufExiste) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Código UF não encontrado no Banco de Dados', 400);
        }
        const municipioExiste = await repositorioMunicipio.findOne({
            where: { nome: nome, codigoUF: codigoUF }
        });
        if (municipioExiste && municipioExiste.codigoMunicipio !== codigoMunicipio) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Município já cadastrado nesse UF', 400);
        }
        municipio.uf = ufExiste;
        municipio.nome = nome;
        municipio.status = status;
        try {
            await repositorioMunicipio.save(municipio);
        }
        catch (error) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Erro ao salvar as alterações no banco de dados', 500);
        }
    }
    async atualizarMunicipio({ codigoMunicipio, codigoUF, nome, status }, requisicao, resposta) {
        try {
            await this.validaTodosOsCampus({ codigoMunicipio, codigoUF, nome, status });
            const repositorioMunicipio = this.obterRepositorioMunicipio();
            const municipios = await repositorioMunicipio.find({
                select: ["codigoMunicipio", "nome", "status", "uf"],
                relations: ["uf"]
            });
            const todosMunicipios = this.listarMunicipios(municipios);
            return resposta.status(200).json(todosMunicipios);
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
exports.AtualizarMunicipio = AtualizarMunicipio;
