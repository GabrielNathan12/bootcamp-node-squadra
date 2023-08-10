"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarMunicipio = void 0;
const ErrosDaAplicacao_1 = require("../../../../errosAplicacao/ErrosDaAplicacao");
const Servicos_1 = require("../Servicos");
class CriarMunicipio extends Servicos_1.Servicos {
    constructor(repositorio) {
        super(repositorio);
    }
    async criarNovoMunicipio({ codigoUF, nome, status }, requisicao, resposta) {
        try {
            const repositorioMunicipio = this.obterRepositorioMunicipio();
            await this.validaTodosOsCampus({ codigoUF, nome, status });
            const novoMuncipio = repositorioMunicipio.create({
                uf: { codigoUF: codigoUF }, nome: nome, status: status
            });
            await repositorioMunicipio.save(novoMuncipio);
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
exports.CriarMunicipio = CriarMunicipio;
