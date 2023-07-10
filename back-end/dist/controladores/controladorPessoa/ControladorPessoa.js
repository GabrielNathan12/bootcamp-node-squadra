"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControladorPessoa = void 0;
const CriarPessoa_1 = require("./servicos/CriarPessoa");
const ListarPessoa_1 = require("./servicos/ListarPessoa");
const DeletarPessoa_1 = require("./servicos/DeletarPessoa");
const AtualizarPessoa_1 = require("./servicos/AtualizarPessoa");
class ControladorPessoa {
    constructor(repositorio) {
        this.repositorios = repositorio;
    }
    async criarPessoa(requisicao, resposta) {
        try {
            const { nome, sobrenome, idade, login, senha, status } = requisicao.body;
            const criarNovaPessoa = new CriarPessoa_1.CriarPessoa(this.repositorios);
            if (nome === undefined || sobrenome === undefined || idade === undefined || login === undefined || senha === undefined || status === undefined) {
                return resposta.status(400).json({ mensagem: 'Erro ao encontrar dados no Json', status: '400' });
            }
            if (!this.verificarStatus(Number(status))) {
                return resposta.status(400).json({ mensagem: 'Status do campo invalido', status: '400' });
            }
            const novaPessoa = await criarNovaPessoa.criarPessoa({ nome, sobrenome, idade, login, senha, status }, requisicao, resposta);
            return novaPessoa;
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: '500', error });
        }
    }
    async listarPessoa(requisicao, resposta) {
        try {
            const litarPessoa = new ListarPessoa_1.ListarPessoa(this.repositorios);
            const pessoas = await litarPessoa.listarPessoas(requisicao, resposta);
            return pessoas;
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: '500', error });
        }
    }
    async deletarPessoa(requisicao, resposta) {
        try {
            const { codigoPessoa } = requisicao.params;
            const deletarPeloId = new DeletarPessoa_1.DeletarPessoa(this.repositorios);
            const deletado = await deletarPeloId.deletarPessoa({ codigoPessoa: Number(codigoPessoa) }, requisicao, resposta);
            return deletado;
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: '500', error });
        }
    }
    async atualizarPessoa(requisicao, resposta) {
        try {
            const { codigoPessoa, nome, sobrenome, idade, login, senha, status } = requisicao.body;
            if (!codigoPessoa || !nome || !sobrenome || !idade || !login || !senha || !status) {
                return resposta.status(400).json({ mensagem: 'Erro ao encontrar dados do Json', status: '400' });
            }
            if (!this.verificarStatus(Number(status))) {
                return resposta.status(400).json({ mensagem: 'Status invalido', status: '400' });
            }
            const atualizar = new AtualizarPessoa_1.AtualizarPessoa(this.repositorios);
            const pessoa = atualizar.atualizarPessoa({ codigoPessoa, nome, sobrenome, idade, login, senha, status }, requisicao, resposta);
            return pessoa;
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: '500', error });
        }
    }
    verificarStatus(status) {
        if (status === 0 || status === 1) {
            return true;
        }
        return false;
    }
}
exports.ControladorPessoa = ControladorPessoa;
