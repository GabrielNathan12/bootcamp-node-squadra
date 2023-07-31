"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarPessoa = void 0;
const bcryptjs_1 = require("bcryptjs");
class CriarPessoa {
    constructor(repositorio) {
        this.repositorios = repositorio;
    }
    async criarPessoa({ nome, sobrenome, idade, login, senha, status }, requisicao, resposta) {
        const pessoaRepositorio = this.repositorios.pessoaRepositorio;
        const loginPessoa = await pessoaRepositorio.findOne({ where: { login: login } });
        const criptografar = await (0, bcryptjs_1.hash)(senha, 8);
        const emailExiste = this.repositorios.pessoaRepositorio.findOne({ where: { login: login } });
        if (emailExiste !== null) {
            return resposta.status(400).json({ mensagem: "Email ja cadastrado", status: 400 });
        }
        if (!loginPessoa) {
            const novaPessoa = pessoaRepositorio.create({
                nome: nome, sobrenome: sobrenome, idade: idade, login: login, senha: criptografar, status: status
            });
            await pessoaRepositorio.save(novaPessoa);
            return resposta.status(200).json(await pessoaRepositorio.find({}));
        }
        else if (loginPessoa) {
            return resposta.status(400).json({ mensagem: 'Email ja usado na aplicacao', status: '400' });
        }
    }
}
exports.CriarPessoa = CriarPessoa;
