"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControladorAutenticacao = void 0;
const AutenticacaoPessoa_1 = require("./servicos/AutenticacaoPessoa");
class ControladorAutenticacao {
    constructor(repositorios) {
        this.repositorios = repositorios;
    }
    async criarSecao(requisicao, resposta) {
        const { login, senha } = requisicao.body;
        const autenticacaoPessoa = new AutenticacaoPessoa_1.AutenticacaoPessoa(this.repositorios);
        try {
            const loginPessoa = await autenticacaoPessoa.criarAutenticacao({ login, senha }, requisicao, resposta);
            return resposta.status(200).json(loginPessoa);
        }
        catch (error) {
            return resposta.status(500).json({ mensagem: 'Erro interno no servidor', status: '500' });
        }
    }
}
exports.ControladorAutenticacao = ControladorAutenticacao;
