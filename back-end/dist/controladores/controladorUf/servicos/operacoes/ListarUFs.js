"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarUFs = void 0;
const Servicos_1 = require("../Servicos");
class ListarUFs extends Servicos_1.Servicos {
    constructor(repositorio) {
        super(repositorio);
    }
    async listarUf(requisicao, resposta) {
        const { codigoUF, nome, sigla, status } = requisicao.query;
        if (codigoUF || nome || sigla || status) {
            if (!Number(status) || (Number(status) !== 1 && Number(status) !== 2)) {
                if (status !== undefined) {
                    return resposta.status(400).json({ mensagem: `Status invalido na busca, valor = ${status}`, status: 400 });
                }
            }
            this.listaFiltrada({ codigoUF: Number(codigoUF),
                nome: nome, sigla: sigla, status: Number(status) }, requisicao, resposta);
        }
        else {
            return resposta.status(200).json(await this.listarUfs());
        }
    }
    async listaFiltrada({ codigoUF, nome, sigla, status }, requisicao, resposta) {
        try {
            let filtarDados = {};
            if (codigoUF) {
                filtarDados.codigoUF = Number(codigoUF);
            }
            if (nome) {
                filtarDados.nome = nome;
            }
            if (sigla) {
                filtarDados.sigla = sigla;
            }
            if (status !== undefined) {
                const statusNumero = Number(status);
                if (statusNumero === 1 || statusNumero === 2) {
                    filtarDados.status = Number(status);
                }
            }
            const ufsFiltrados = await this.obterRepositorioUF().find({ where: filtarDados });
            return resposta.status(200).json(ufsFiltrados);
        }
        catch (error) {
            return resposta.status(400).json({ mensagem: 'Erro ao filtrar UFs', status: 400, error });
        }
    }
}
exports.ListarUFs = ListarUFs;
