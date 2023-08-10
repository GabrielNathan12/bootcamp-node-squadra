"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtualizarEndereco = void 0;
const Servicos_1 = require("../Servicos");
const ErrosDaAplicacao_1 = require("../../../../errosAplicacao/ErrosDaAplicacao");
class AtualizarEndereco extends Servicos_1.Servicos {
    constructor(repositorio) {
        super(repositorio);
    }
    async atualizarEndereco({ codigoEndereco, codigoBairro, codigoPessoa, nomeRua, numero, complemento, cep }, requisicao, resposta) {
        try {
            const enderecoReposito = this.obterRepositorioEndereco();
            const bairroRepositorio = this.obterRepositorioBairro();
            const pessoaRepositorio = this.obterRepositorioPessoa();
            const enderecoExiste = await enderecoReposito.findOne({ where: { codigoEndereco: codigoEndereco } });
            if (!enderecoExiste) {
                throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Endereco nao encontrado', 400);
            }
            const bairroExiste = await bairroRepositorio.findOne({ where: { codigoBairro: codigoBairro } });
            if (!bairroExiste) {
                throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Bairro nao encontrado', 400);
            }
            const pessoaExiste = await pessoaRepositorio.findOne({ where: { codigoPessoa: codigoPessoa } });
            if (!pessoaExiste) {
                throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Pessoa nao encontrado', 400);
            }
            enderecoExiste.pessoa = pessoaExiste;
            enderecoExiste.bairro = bairroExiste;
            enderecoExiste.nomeRua = nomeRua;
            enderecoExiste.numero = numero;
            enderecoExiste.complemento = complemento;
            enderecoExiste.cep = cep;
            await enderecoReposito.save(enderecoExiste);
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
exports.AtualizarEndereco = AtualizarEndereco;
