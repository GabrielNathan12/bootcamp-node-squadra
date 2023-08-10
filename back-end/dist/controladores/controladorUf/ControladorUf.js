"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControladorUF = void 0;
const ListarUFs_1 = require("./servicos/operacoes/ListarUFs");
const CriarUF_1 = require("./servicos/operacoes/CriarUF");
const AtualizarUF_1 = require("./servicos/operacoes/AtualizarUF");
const DeletarUF_1 = require("./servicos/operacoes/DeletarUF");
class ControladorUF {
    constructor(repositorio) {
        this.repositorios = repositorio;
    }
    async litarUF(requisicao, resposta) {
        try {
            const listaUf = new ListarUFs_1.ListarUFs(this.repositorios);
            await listaUf.listarUf(requisicao, resposta);
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error });
        }
    }
    async criarUf(requisicao, resposta) {
        try {
            const { nome, sigla, status } = requisicao.body;
            const servicos = new CriarUF_1.CriarUF(this.repositorios);
            await servicos.criarNovoUF({ nome, sigla, status }, requisicao, resposta);
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error });
        }
    }
    async atualizarUf(requisicao, resposta) {
        try {
            const { codigoUF, nome, sigla, status } = requisicao.body;
            const servicos = new AtualizarUF_1.AtualizarUF(this.repositorios);
            await servicos.atualizarUf({ codigoUF, nome, sigla, status }, requisicao, resposta);
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error });
        }
    }
    async deletarUf(requisicao, resposta) {
        try {
            const { codigoUF } = requisicao.params;
            const deletarPeloId = new DeletarUF_1.DeletarUF(this.repositorios);
            const deletado = await deletarPeloId.deletarUF({ codigoUF: Number(codigoUF) }, resposta);
            return deletado;
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error });
        }
    }
}
exports.ControladorUF = ControladorUF;
