"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControladorBairro = void 0;
const CriarBairro_1 = require("./servicos/operacoes/CriarBairro");
const ListarBairro_1 = require("./servicos/operacoes/ListarBairro");
const AtualizarBairro_1 = require("./servicos/operacoes/AtualizarBairro");
const DeletarBairro_1 = require("./servicos/operacoes/DeletarBairro");
class ControladorBairro {
    constructor(repositorio) {
        this.repositorios = repositorio;
    }
    async criarBairro(requisicao, resposta) {
        try {
            const { codigoMunicipio, nome, status } = requisicao.body;
            const criarNovoBairro = new CriarBairro_1.CriarBairro(this.repositorios);
            await criarNovoBairro.criarBairro({ codigoMunicipio, nome, status }, requisicao, resposta);
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error });
        }
    }
    async listarBairro(requisicao, resposta) {
        try {
            const listarBairro = new ListarBairro_1.ListarBairro(this.repositorios);
            await listarBairro.listarBairro(requisicao, resposta);
        }
        catch (erro) {
            return resposta.status(500).json({ mensagem: 'Erro interno no servidor', status: 500 });
        }
    }
    async atualizarBairro(requisicao, resposta) {
        try {
            const { codigoBairro, codigoMunicipio, nome, status } = requisicao.body;
            const atualizar = new AtualizarBairro_1.AtualizarBairro(this.repositorios);
            await atualizar.atualizarBairro({ codigoBairro, codigoMunicipio, nome, status }, requisicao, resposta);
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error });
        }
    }
    async deletarBairro(requisicao, resposta) {
        try {
            const { codigoBairro } = requisicao.params;
            const deletarPeloId = new DeletarBairro_1.DeletarBairro(this.repositorios);
            await deletarPeloId.deletarBairro({ codigoBairro: Number(codigoBairro) }, requisicao, resposta);
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error });
        }
    }
}
exports.ControladorBairro = ControladorBairro;
