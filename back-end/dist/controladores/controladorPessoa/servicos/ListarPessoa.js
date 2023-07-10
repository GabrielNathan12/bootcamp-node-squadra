"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarPessoa = void 0;
class ListarPessoa {
    constructor(repositorio) {
        this.repositorios = repositorio;
    }
    async listarPessoas(requisicao, resposta) {
        const pessoaRepositorio = this.repositorios.pessoaRepositorio;
        const { codigoPessoa, nome, sobrenome, idade, status } = requisicao.query;
        if (codigoPessoa || nome || sobrenome || idade || status) {
            this.listaFiltrada({ codigoPessoa: Number(codigoPessoa),
                nome: nome,
                sobrenome: sobrenome,
                idade: Number(idade),
                status: Number(status) }, requisicao, resposta);
        }
        else {
            return resposta.status(200).json(await pessoaRepositorio.find({ relations: { enderecos: true } }));
        }
    }
    async listaFiltrada({ codigoPessoa, nome, sobrenome, idade, status }, requisicao, resposta) {
        try {
            const filtarPessoa = {};
            if (codigoPessoa) {
                filtarPessoa.codigoPessoa = Number(codigoPessoa);
            }
            if (nome) {
                filtarPessoa.nome = nome;
            }
            if (sobrenome) {
                filtarPessoa.sobrenome = sobrenome;
            }
            if (idade) {
                filtarPessoa.idade = Number(idade);
            }
            if (status) {
                filtarPessoa.status = Number(status);
            }
            const pessoaFiltrada = await this.repositorios.pessoaRepositorio.find({ where: filtarPessoa });
            return resposta.status(200).json(pessoaFiltrada);
        }
        catch (error) {
            return resposta.status(400).json({ mensagem: 'Erro ao filtrar as pessoas', status: '400' + error });
        }
    }
}
exports.ListarPessoa = ListarPessoa;
