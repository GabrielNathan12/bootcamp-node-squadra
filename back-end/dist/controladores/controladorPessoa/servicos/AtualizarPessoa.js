"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtualizarPessoa = void 0;
class AtualizarPessoa {
    constructor(repositorio) {
        this.repositorios = repositorio;
    }
    async atualizarPessoa({ codigoPessoa, nome, sobrenome, idade, login, senha, status }, requisicao, resposta) {
        const pessoaRepositorio = this.repositorios.pessoaRepositorio;
        const pessoa = await pessoaRepositorio.findOne({ where: { codigoPessoa: codigoPessoa } });
        const loginPessoa = await pessoaRepositorio.findOne({ where: { login: login } });
        if (loginPessoa && login !== (pessoa === null || pessoa === void 0 ? void 0 : pessoa.login)) {
            return resposta.status(400).json({ mensagem: 'Email ja usado na aplicacao', status: '400' });
        }
        if (!pessoa) {
            return resposta.status(400).json({ mensagem: 'Codigo pessoa nao encontrado', status: '400' });
        }
        pessoa.nome = nome;
        pessoa.sobrenome = sobrenome;
        pessoa.idade = idade;
        pessoa.login = login;
        pessoa.senha = senha;
        pessoa.status = status;
        await pessoaRepositorio.save(pessoa);
        return resposta.status(200).json(await pessoaRepositorio.find({}));
    }
}
exports.AtualizarPessoa = AtualizarPessoa;
