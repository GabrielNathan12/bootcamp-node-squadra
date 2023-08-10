"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarEndereco = void 0;
const ErrosDaAplicacao_1 = require("../../../../errosAplicacao/ErrosDaAplicacao");
const Servicos_1 = require("../Servicos");
class CriarEndereco extends Servicos_1.Servicos {
    constructor(repositorio) {
        super(repositorio);
    }
    async validaTodosOsCampus({ codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep }) {
        const pessoaRepositorio = this.obterRepositorioPessoa();
        const bairroRepositorio = this.obterRepositorioBairro();
        if (!nomeRua) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('nomeRua nao existe', 400);
        }
        if (!numero) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('numero nao existe', 400);
        }
        if (!complemento) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('complemento nao existe', 400);
        }
        if (!cep) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('cep nao existe', 400);
        }
        const pessoaExiste = await pessoaRepositorio.findOne({ where: { codigoPessoa: Number(codigoPessoa) } });
        const bairroExiste = await bairroRepositorio.findOne({ where: { codigoBairro: Number(codigoBairro) } });
        if (!pessoaExiste) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('codigoPessoa nao existe', 400);
        }
        if (!bairroExiste) {
            throw new ErrosDaAplicacao_1.ErrosDaAplicacao('codigoBairro nao existe', 400);
        }
    }
    async criarEndereco({ codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep, status }, requisicao, resposta) {
        try {
            const enderecoReposito = this.obterRepositorioEndereco();
            await this.validaTodosOsCampus({ codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep, status });
            const novoEndereco = enderecoReposito.create({
                pessoa: { codigoPessoa }, bairro: { codigoBairro },
                nomeRua: nomeRua, numero: numero, complemento: complemento, cep: cep
            });
            await enderecoReposito.save(novoEndereco);
            const enderecos = await enderecoReposito.find({
                select: ["codigoEndereco", "pessoa", "bairro", "nomeRua", "numero", "complemento", "cep"],
                relations: ["pessoa", "bairro"]
            });
            const todosEnderecos = this.listarTodosEnderecos(enderecos);
            return resposta.status(200).json(todosEnderecos);
        }
        catch (error) {
            if (error instanceof ErrosDaAplicacao_1.ErrosDaAplicacao) {
                return resposta.status(error.status).json({ mensagem: error.message, status: error.status });
            }
            else {
                return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error });
            }
        }
    }
}
exports.CriarEndereco = CriarEndereco;
