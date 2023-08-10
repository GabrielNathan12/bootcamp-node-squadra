"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarPessoa = void 0;
const bcryptjs_1 = require("bcryptjs");
const ErrosDaAplicacao_1 = require("../../../../errosAplicacao/ErrosDaAplicacao");
const Servicos_1 = require("../Servicos");
class CriarPessoa extends Servicos_1.Servicos {
    constructor(repositorio) {
        super(repositorio);
    }
    async criarPessoa(dadosPessoa, requisicao, resposta) {
        try {
            const { nome, sobrenome, idade, login, senha, status, enderecos } = dadosPessoa;
            await this.validaTodosOsCampos({ nome, sobrenome, idade, login, senha, status });
            const repositorioPessoa = this.obterRepositorioPessoa();
            const repositorioEndereco = this.obterRepositorioEndereco();
            const criptografar = await (0, bcryptjs_1.hash)(senha, 8);
            const emailExiste = await repositorioPessoa.findOne({ where: { login: login } });
            if (emailExiste) {
                throw new ErrosDaAplicacao_1.ErrosDaAplicacao('Email ja cadastrado', 400);
            }
            const novaPessoa = repositorioPessoa.create({
                nome: nome,
                sobrenome: sobrenome,
                idade: idade,
                login: login,
                senha: criptografar,
                status: status,
                enderecos: []
            });
            if (enderecos) {
                const repositorioBairro = this.obterRepositorioBairro();
                for (const endereco of enderecos) {
                    const { codigoBairro, nomeRua, numero, complemento, cep } = endereco;
                    await this.validarCamposEndereco({ codigoBairro, nomeRua, numero, complemento, cep });
                    const bairroExiste = await repositorioBairro.findOne({ where: { codigoBairro: endereco.codigoBairro.codigoBairro } });
                    if (!bairroExiste) {
                        throw new ErrosDaAplicacao_1.ErrosDaAplicacao("Bairro não cadastrado", 400);
                    }
                    const novoEndereco = repositorioEndereco.create({
                        bairro: bairroExiste,
                        nomeRua: endereco.nomeRua,
                        numero: endereco.numero,
                        complemento: endereco.complemento,
                        cep: endereco.cep,
                        pessoa: novaPessoa
                    });
                    novaPessoa.enderecos.push(novoEndereco);
                    await repositorioEndereco.insert(novoEndereco);
                }
            }
            await repositorioPessoa.save(novaPessoa);
            const pessoasComEnderecos = await repositorioPessoa.find({
                select: ["codigoPessoa", "nome", "sobrenome", "idade", "login", "senha", "status"],
                relations: ["enderecos"],
            });
            const todoasPessoas = this.listarTodasPessoas(pessoasComEnderecos);
            return resposta.status(200).json(todoasPessoas);
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
exports.CriarPessoa = CriarPessoa;
