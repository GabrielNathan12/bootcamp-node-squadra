"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarMunicipio = void 0;
const Servicos_1 = require("../Servicos");
class ListarMunicipio extends Servicos_1.Servicos {
    constructor(repositorio) {
        super(repositorio);
    }
    async listarMunicipio(requisicao, resposta) {
        const { codigoMunicipio, codigoUF, nome, status } = requisicao.query;
        if (codigoMunicipio || nome || status || codigoUF) {
            if (!Number(status) || (Number(status) !== 1 && Number(status) !== 2)) {
                if (status !== undefined) {
                    return resposta.status(400).json({ mensagem: `Status invalido na busca, valor = ${status}`, status: '400' });
                }
            }
            this.listFiltrada({
                codigoMunicipio: Number(codigoMunicipio), codigoUF: Number(codigoUF),
                nome: nome, status: Number(status)
            }, requisicao, resposta);
        }
        else {
            const municipios = await this.obterRepositorioMunicipio().find({
                select: ["codigoMunicipio", "nome", "status", "uf"],
                relations: ["uf"]
            });
            const todosMunicipios = this.listarMunicipios(municipios);
            return resposta.status(200).json(todosMunicipios);
        }
    }
    async listFiltrada({ codigoMunicipio, codigoUF, nome, status }, requisicao, resposta) {
        try {
            let filtrarMunicipio = {};
            if (codigoMunicipio) {
                filtrarMunicipio.codigoMunicipio = Number(codigoMunicipio);
            }
            if (nome) {
                filtrarMunicipio.nome = nome;
            }
            if (codigoUF) {
                filtrarMunicipio.codigoUF = codigoUF;
            }
            if (status !== undefined) {
                const statusNumero = Number(status);
                if (statusNumero === 1 || statusNumero === 2) {
                    filtrarMunicipio.status = Number(status);
                }
            }
            const municipiosFiltrados = await this.obterRepositorioMunicipio().find({
                where: filtrarMunicipio,
                select: ["codigoMunicipio", "nome", "status", "uf"],
                relations: ["uf"]
            });
            const todosMunicipios = this.listarMunicipios(municipiosFiltrados);
            return resposta.status(200).json(todosMunicipios);
        }
        catch (error) {
            resposta.status(400).json({ mensagem: 'Erro ao filtrar os municipios', status: 400, error });
        }
    }
}
exports.ListarMunicipio = ListarMunicipio;
