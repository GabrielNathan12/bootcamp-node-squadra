"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletarPessoa = void 0;
class DeletarPessoa {
    constructor(repositorio) {
        this.repositorios = repositorio;
    }
    async deletarPessoa({ codigoPessoa }, requisicao, resposta) {
        const pessoaRepositorio = this.repositorios.pessoaRepositorio;
        const pessoa = await pessoaRepositorio.findOne({ where: { codigoPessoa: codigoPessoa } });
        if (!pessoa) {
            return resposta.status(400).json({ mensagem: 'Pessoa nao encontrada', status: '400' });
        }
        await pessoaRepositorio.remove(pessoa);
        return resposta.status(200).json(await pessoaRepositorio.find({}));
    }
}
exports.DeletarPessoa = DeletarPessoa;
