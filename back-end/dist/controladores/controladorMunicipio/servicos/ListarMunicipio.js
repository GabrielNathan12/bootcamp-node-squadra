"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarMunicipio = void 0;
class ListarMunicipio {
    constructor(repositorio) {
        this.repositorioMunicipio = repositorio;
    }
    async listarMunicipio(requisicao, resposta) {
        const municipioRepositorio = this.repositorioMunicipio.municipioRepositorio;
        const { codigoMunicipio, nome, status } = requisicao.query;
        if (codigoMunicipio || nome || status) {
            this.listFiltrada({ codigoMunicipio: Number(codigoMunicipio), nome: nome, status: Number(status) }, requisicao, resposta);
        }
        else {
            return resposta.status(200).json(await municipioRepositorio.find({ relations: { bairros: true } }));
        }
    }
    async listFiltrada({ codigoMunicipio, nome, status }, requisicao, resposta) {
        try {
            let filtrarMunicipio = {};
            if (codigoMunicipio) {
                filtrarMunicipio.codigoMunicipio = Number(codigoMunicipio);
            }
            if (nome) {
                filtrarMunicipio.nome = nome;
            }
            if (status) {
                filtrarMunicipio.status = Number(status);
            }
            const municipiosFiltrados = await this.repositorioMunicipio.municipioRepositorio.find({ where: filtrarMunicipio });
            return resposta.status(200).json(municipiosFiltrados);
        }
        catch (error) {
            resposta.status(400).json({ mensagem: 'Erro ao filtrar os municipios', status: '400' + error });
        }
    }
}
exports.ListarMunicipio = ListarMunicipio;
