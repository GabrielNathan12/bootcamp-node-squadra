"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControladorEndereco = void 0;
const ListarEndereco_1 = require("./servicos/operacoes/ListarEndereco");
const CriarEndereco_1 = require("./servicos/operacoes/CriarEndereco");
const AtualizarEndereco_1 = require("./servicos/operacoes/AtualizarEndereco");
const DeletarEndereco_1 = require("./servicos/operacoes/DeletarEndereco");
class ControladorEndereco {
    constructor(repositorios) {
        this.repositorio = repositorios;
    }
    async listarEndereco(requisicao, resposta) {
        try {
            const listaEndereco = new ListarEndereco_1.ListaEndereco(this.repositorio);
            await listaEndereco.litaEndereco(requisicao, resposta);
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error });
        }
    }
    async criarEndereco(requisicao, resposta) {
        try {
            const { codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep, status } = requisicao.body;
            const criarNovoEndereco = new CriarEndereco_1.CriarEndereco(this.repositorio);
            await criarNovoEndereco.criarEndereco({ codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep, status }, requisicao, resposta);
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error });
        }
    }
    async atualizarEndereco(requisicao, resposta) {
        try {
            const { codigoEndereco, codigoBairro, codigoPessoa, nomeRua, numero, complemento, cep } = requisicao.body;
            const atualizar = new AtualizarEndereco_1.AtualizarEndereco(this.repositorio);
            await atualizar.atualizarEndereco({ codigoEndereco, codigoBairro, codigoPessoa, nomeRua, numero, complemento, cep }, requisicao, resposta);
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error });
        }
    }
    async deletarEndereco(requisicao, resposta) {
        try {
            const { codigoEndereco } = requisicao.params;
            const deletarPeloId = new DeletarEndereco_1.DeletarEndereco(this.repositorio);
            await deletarPeloId.deletarEndereco({ codigoEndereco: Number(codigoEndereco) }, requisicao, resposta);
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error });
        }
    }
}
exports.ControladorEndereco = ControladorEndereco;
