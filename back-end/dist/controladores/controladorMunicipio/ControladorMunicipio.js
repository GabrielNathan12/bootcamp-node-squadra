"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControladorMunicipio = void 0;
const ListarMunicipio_1 = require("./servicos/operacoes/ListarMunicipio");
const CriarMunicipio_1 = require("./servicos/operacoes/CriarMunicipio");
const AtualizarMunicipio_1 = require("./servicos/operacoes/AtualizarMunicipio");
const DeletarMunicipio_1 = require("./servicos/operacoes/DeletarMunicipio");
class ControladorMunicipio {
    constructor(repositorios) {
        this.repositorio = repositorios;
    }
    async listarMunicipio(requisicao, resposta) {
        try {
            const listarMunicipio = new ListarMunicipio_1.ListarMunicipio(this.repositorio);
            await listarMunicipio.listarMunicipio(requisicao, resposta);
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error });
        }
    }
    async criarMunicipio(requisicao, resposta) {
        try {
            const { codigoUF, nome, status } = requisicao.body;
            const criarNovoMunicipio = new CriarMunicipio_1.CriarMunicipio(this.repositorio);
            await criarNovoMunicipio.criarNovoMunicipio({ codigoUF, nome, status }, requisicao, resposta);
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: "Erro interno no servidor", status: 500, error });
        }
    }
    async atualizarMunicipio(requisicao, resposta) {
        try {
            const { codigoMunicipio, codigoUF, nome, status } = requisicao.body;
            const atualizar = new AtualizarMunicipio_1.AtualizarMunicipio(this.repositorio);
            await atualizar.atualizarMunicipio({ codigoMunicipio, codigoUF, nome, status }, requisicao, resposta);
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error });
        }
    }
    async deletarMunicipio(requisicao, resposta) {
        try {
            const { codigoMunicipio } = requisicao.params;
            const deletarPeloId = new DeletarMunicipio_1.DeletarMunicipio(this.repositorio);
            await deletarPeloId.deletarMunicipio({ codigoMunicipio: Number(codigoMunicipio) }, requisicao, resposta);
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error });
        }
    }
}
exports.ControladorMunicipio = ControladorMunicipio;
