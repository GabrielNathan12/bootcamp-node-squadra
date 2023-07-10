"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControladorMunicipio = void 0;
const ListarMunicipio_1 = require("./servicos/ListarMunicipio");
const CriarNovoMunicipio_1 = require("./servicos/CriarNovoMunicipio");
const AtualizarMunicipio_1 = require("./servicos/AtualizarMunicipio");
const DeletarMunicipio_1 = require("./servicos/DeletarMunicipio");
class ControladorMunicipio {
    constructor(repositorios) {
        this.repositorio = repositorios;
    }
    async listarMunicipio(requisicao, resposta) {
        try {
            const listarMunicipio = new ListarMunicipio_1.ListarMunicipio(this.repositorio);
            const municipio = await listarMunicipio.listarMunicipio(requisicao, resposta);
            return municipio;
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: '500', error });
        }
    }
    async criarMunicipio(requisicao, resposta) {
        try {
            const { codigoUF, nome, status } = requisicao.body;
            const criarNovoMunicipio = new CriarNovoMunicipio_1.CriarMunicipio(this.repositorio);
            if (codigoUF === undefined || nome === undefined || status === undefined) {
                return resposta.status(400).json({ mensagem: 'Erro ao encontrar dados no Json', status: '400' });
            }
            if (!this.verificaStatus(Number(status))) {
                return resposta.status(400).json({ mensagem: 'Status do campo invalido', status: '400' });
            }
            const novoMuncipio = await criarNovoMunicipio.criarNovoMunicipio({ codigoUF, nome, status }, requisicao, resposta);
            return novoMuncipio;
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: '500', error });
        }
    }
    async atualizarMunicipio(requisicao, resposta) {
        try {
            const { codigoMunicipio, nome, status } = requisicao.body;
            const atualizar = new AtualizarMunicipio_1.AtualizarMunicipio(this.repositorio);
            if (!codigoMunicipio || !nome || !status) {
                return resposta.status(400).json({ mensagem: 'Erro ao encontrar dados no Json', status: '400' });
            }
            if (!this.verificaStatus(Number(status))) {
                return resposta.status(400).json({ mensagem: 'Status do campo invalido', status: '400' });
            }
            const municipio = await atualizar.atualizarMunicipio({ codigoMunicipio, nome, status }, requisicao, resposta);
            return municipio;
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: '500', error });
        }
    }
    async deletarMunicipio(requisicao, resposta) {
        try {
            const { codigoMunicipio } = requisicao.params;
            const deletarPeloId = new DeletarMunicipio_1.DeletarMunicipio(this.repositorio);
            const deletado = await deletarPeloId.deletarMunicipio({ codigoMunicipio: Number(codigoMunicipio) }, requisicao, resposta);
            return deletado;
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: '500', error });
        }
    }
    verificaStatus(status) {
        if (status == 0 || status == 1) {
            return true;
        }
        return false;
    }
}
exports.ControladorMunicipio = ControladorMunicipio;
