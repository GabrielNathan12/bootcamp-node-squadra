"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControladorPessoa = void 0;
const CriarPessoa_1 = require("./servicos/operacoes/CriarPessoa");
const ListarPessoa_1 = require("./servicos/operacoes/ListarPessoa");
const DeletarPessoa_1 = require("./servicos/operacoes/DeletarPessoa");
const AtualizarPessoa_1 = require("./servicos/operacoes/AtualizarPessoa");
class ControladorPessoa {
    constructor(repositorio) {
        this.repositorios = repositorio;
    }
    async criarPessoa(requisicao, resposta) {
        try {
            const { nome, sobrenome, idade, login, senha, status, enderecos } = requisicao.body;
            const criarNovaPessoa = new CriarPessoa_1.CriarPessoa(this.repositorios);
            await criarNovaPessoa.criarPessoa({ nome, sobrenome, idade, login, senha, status, enderecos }, requisicao, resposta);
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: '500', error });
        }
    }
    async listarPessoa(requisicao, resposta) {
        try {
            const litarPessoa = new ListarPessoa_1.ListarPessoa(this.repositorios);
            await litarPessoa.listarPessoas(requisicao, resposta);
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
            const { codigoPessoa, nome, sobrenome, idade, login, senha, status, enderecos } = requisicao.body;
            const atualizar = new AtualizarPessoa_1.AtualizarPessoa(this.repositorios);
            atualizar.atualizarPessoa({ codigoPessoa, nome, sobrenome, idade, login, senha, status, enderecos }, requisicao, resposta);
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: '500', error });
        }
    }
}
exports.ControladorPessoa = ControladorPessoa;
