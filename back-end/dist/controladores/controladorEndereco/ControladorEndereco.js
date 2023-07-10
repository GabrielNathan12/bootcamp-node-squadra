"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControladorEndereco = void 0;
const ListarEndereco_1 = require("./servicos/ListarEndereco");
const CriarEndereco_1 = require("./servicos/CriarEndereco");
const AtualizarEndereco_1 = require("./servicos/AtualizarEndereco");
const DeletarEndereco_1 = require("./servicos/DeletarEndereco");
class ControladorEndereco {
    constructor(repositorios) {
        this.repositorio = repositorios;
    }
    async listarEndereco(requisicao, resposta) {
        try {
            const listaEndereco = new ListarEndereco_1.ListaEndereco(this.repositorio);
            const endereco = await listaEndereco.litaEndereco(requisicao, resposta);
            return endereco;
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: '500', error });
        }
    }
    async criarEndereco(requisicao, resposta) {
        try {
            const { codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep, status } = requisicao.body;
            const criarNovoEndereco = new CriarEndereco_1.CriarEndereco(this.repositorio);
            if (codigoPessoa === undefined || codigoBairro === undefined || nomeRua === undefined || numero === undefined || complemento === undefined || cep === undefined || status === undefined) {
                return resposta.status(400).json({ mensagem: 'Erro ao ler os dados no Json, falta campos', status: '400' });
            }
            if (!this.verificarStatus(Number(status))) {
                return resposta.status(400).json({ mensagem: 'Status invalido', status: '400' });
            }
            const novoEndereco = await criarNovoEndereco.criarEndereco({ codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep, status }, requisicao, resposta);
            return novoEndereco;
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: '500', error });
        }
    }
    async atualizarEndereco(requisicao, resposta) {
        try {
            const { codigoEndereco, nomeRua, numero, complemento, cep, status } = requisicao.body;
            const atualizar = new AtualizarEndereco_1.AtualizarEndereco(this.repositorio);
            if (!codigoEndereco || !nomeRua || !numero || !complemento || !cep || !status) {
                return resposta.status(400).json({ mensagem: 'Erro ao ler os dados no Json, falta campos', status: '400' });
            }
            if (!this.verificarStatus(Number(status))) {
                return resposta.status(400).json({ mensagem: 'Status do campo invalido', status: '400' });
            }
            const endereco = await atualizar.atualizarEndereco({ codigoEndereco, nomeRua, numero, complemento, cep, status }, requisicao, resposta);
            return endereco;
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: '500', error });
        }
    }
    async deletarEndereco(requisicao, resposta) {
        try {
            const { codigoEndereco } = requisicao.params;
            const deletarPeloId = new DeletarEndereco_1.DeletarEndereco(this.repositorio);
            const deletado = await deletarPeloId.deletarEndereco({ codigoEndereco: Number(codigoEndereco) }, requisicao, resposta);
            return deletado;
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: '500', error });
        }
    }
    verificarStatus(status) {
        if (status == 0 || status == 1) {
            return true;
        }
        return false;
    }
}
exports.ControladorEndereco = ControladorEndereco;
