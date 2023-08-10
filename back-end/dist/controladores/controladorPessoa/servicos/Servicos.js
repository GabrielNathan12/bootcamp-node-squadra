"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Servicos = void 0;
const ErrosDaAplicacao_1 = require("../../../errosAplicacao/ErrosDaAplicacao");
class Servicos {
    constructor(repositorios) {
        this.repositorios = repositorios;
    }
    async validaTodosOsCampos({ nome, sobrenome, idade, login, senha, status }) {
        const repositorioPessoa = this.obterRepositorioPessoa();
        if (!nome) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Campo nome nao encontrado', 400);
        }
        if (!sobrenome) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Campo sobrenome nao encontrado', 400);
        }
        if (!idade || isNaN(idade)) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Idade nao e um numero', 400);
        }
        if (!login) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Campo login nao encontrado', 400);
        }
        if (!senha) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Campo senha nao encontrado', 400);
        }
        if (!status || isNaN(status) || !this.verificaStatusValido(Number(status))) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao(`Status do campo invalido, valor do status: ${status}`, 400);
        }
    }
    async validarCamposEndereco({ codigoBairro, nomeRua, numero, complemento, cep }) {
        if (!codigoBairro) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Codigo bairro nao encontrado', 400);
        }
        if (!nomeRua) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Codigo bairro nao encontrado', 400);
        }
        if (!numero) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Codigo bairro nao encontrado', 400);
        }
        if (!complemento) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Codigo bairro nao encontrado', 400);
        }
        if (!cep) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Codigo bairro nao encontrado', 400);
        }
    }
    obterRepositorioPessoa() {
        return this.repositorios.pessoaRepositorio;
    }
    obterRepositorioBairro() {
        return this.repositorios.bairroRepositorio;
    }
    obterRepositorioEndereco() {
        return this.repositorios.enderecoRepositorio;
    }
    verificaStatusValido(status) {
        return status === 1 || status === 2;
    }
    async listarTodosOsDados() {
        const pessoas = await this.repositorios.pessoaRepositorio.find({
            relations: ['enderecos',
                "enderecos.bairro",
                "enderecos.bairro.municipio",
                "enderecos.bairro.municipio.uf"]
        });
        return pessoas;
    }
    listarTodasPessoas(pessoas) {
        return pessoas.map((pessoa) => ({
            codigoPessoa: pessoa.codigoPessoa,
            nome: pessoa.nome,
            sobrenome: pessoa.sobrenome,
            idade: pessoa.idade,
            login: pessoa.login,
            senha: pessoa.senha,
            status: pessoa.status,
            enderecos: []
        }));
    }
}
exports.Servicos = Servicos;
