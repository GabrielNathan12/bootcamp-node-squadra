"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtualizarPessoa = void 0;
const Servicos_1 = require("../Servicos");
const ErrosDaAplicacao_1 = require("../../../../errosAplicacao/ErrosDaAplicacao");
class AtualizarPessoa extends Servicos_1.Servicos {
    constructor(repositorio) {
        super(repositorio);
    }
    async atualizarPessoa(dadosPessoa, requisicao, resposta) {
        try {
            const { codigoPessoa, nome, sobrenome, idade, login, senha, status, enderecos } = dadosPessoa;
            const pessoaRepositorio = this.obterRepositorioPessoa();
            await this.validaTodosOsCampos({ nome, sobrenome, idade, login, senha, status });
            const pessoaExistente = await pessoaRepositorio.findOne({ where: { codigoPessoa }, relations: ["enderecos"] });
            if (!pessoaExistente) {
                throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Pessoa não encontrada', 400);
            }
            if (login && login !== pessoaExistente.login) {
                const emailExiste = await pessoaRepositorio.findOne({ where: { login: login } });
                if (emailExiste) {
                    throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Email já cadastrado', 400);
                }
            }
            pessoaExistente.nome = nome || pessoaExistente.nome;
            pessoaExistente.sobrenome = sobrenome || pessoaExistente.sobrenome;
            pessoaExistente.idade = idade || pessoaExistente.idade;
            pessoaExistente.login = login || pessoaExistente.login;
            pessoaExistente.senha = senha || pessoaExistente.senha;
            pessoaExistente.status = status || pessoaExistente.status;
            if (enderecos) {
                const enderecoRepositorio = this.obterRepositorioEndereco();
                const bairroRepositorio = this.obterRepositorioBairro();
                for (const endereco of enderecos) {
                    const { codigoEndereco, codigoBairro, nomeRua, numero, complemento, cep } = endereco;
                    await this.validarCamposEndereco({ codigoBairro, nomeRua, numero, complemento, cep });
                    const bairroExiste = await bairroRepositorio.findOne({ where: { codigoBairro: endereco.codigoBairro.codigoBairro } });
                    if (!bairroExiste) {
                        throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Bairro não encontrado', 400);
                    }
                    const enderecoExiste = await enderecoRepositorio.findOne({ where: { codigoEndereco: endereco.codigoEndereco } });
                    if (!enderecoExiste) {
                        throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Endereço não encontrado', 400);
                    }
                    enderecoExiste.bairro = bairroExiste;
                    enderecoExiste.nomeRua = nomeRua;
                    enderecoExiste.numero = numero;
                    enderecoExiste.complemento = complemento;
                    enderecoExiste.cep = cep;
                    pessoaExistente.enderecos.push(enderecoExiste);
                    await enderecoRepositorio.save(enderecoExiste);
                }
            }
            await pessoaRepositorio.save(pessoaExistente);
            const pessoasComEnderecos = await pessoaRepositorio.find({
                select: ["codigoPessoa", "nome", "sobrenome", "idade", "login", "senha", "status"],
                relations: ["enderecos"],
            });
            return resposta.status(200).json(pessoasComEnderecos);
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
exports.AtualizarPessoa = AtualizarPessoa;
