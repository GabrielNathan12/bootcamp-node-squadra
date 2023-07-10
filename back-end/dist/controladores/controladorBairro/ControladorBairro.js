"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControladorBairro = void 0;
const CriarBairro_1 = require("./servicos/CriarBairro");
const ListarBairro_1 = require("./servicos/ListarBairro");
const AtualizarBairro_1 = require("./servicos/AtualizarBairro");
const DeletarBairro_1 = require("./servicos/DeletarBairro");
class ControladorBairro {
    constructor(repositorio) {
        this.repositorios = repositorio;
    }
    async criarBairro(requisicao, resposta) {
        try {
            const { codigoMunicipio, nome, status } = requisicao.body;
            const criarNovoBairro = new CriarBairro_1.CriarBairro(this.repositorios);
            if (codigoMunicipio === undefined || nome === undefined || status === undefined) {
                return resposta.send(400).json({ mensagem: 'Erro ao encontrar os campus no Json', status: '400' });
            }
            if (!this.verificaStatus(Number(status))) {
                return resposta.status(400).json({ mensagem: 'Status do campo invalido', status: '400' });
            }
            const novoBairro = await criarNovoBairro.criarBairro({ codigoMunicipio, nome, status }, requisicao, resposta);
            return novoBairro;
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: '500', error });
        }
    }
    async listarBairro(requisicao, resposta) {
        try {
            const listarBairro = new ListarBairro_1.ListarBairro(this.repositorios);
            const bairro = await listarBairro.listarBairro(requisicao, resposta);
            return bairro;
        }
        catch (erro) {
            return resposta.status(500).json({ mensagem: 'Erro interno no servidor', status: '500' });
        }
    }
    async atualizarBairro(requisicao, resposta) {
        try {
            const { codigoBairro, nome, status } = requisicao.body;
            const atualizar = new AtualizarBairro_1.AtualizarBairro(this.repositorios);
            if (!this.verificaStatus(Number(status))) {
                return resposta.status(400).json({ mensagem: 'Status do campo invalido', status: '400' });
            }
            const bairro = await atualizar.atualizarBairro({ codigoBairro, nome, status }, requisicao, resposta);
            return bairro;
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: '500', error });
        }
    }
    async deletarBairro(requisicao, resposta) {
        try {
            const { codigoBairro } = requisicao.params;
            const deletarPeloId = new DeletarBairro_1.DeletarBairro(this.repositorios);
            const deletado = await deletarPeloId.deletarBairro({ codigoBairro: Number(codigoBairro) }, requisicao, resposta);
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
exports.ControladorBairro = ControladorBairro;
