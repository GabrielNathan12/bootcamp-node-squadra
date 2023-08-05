import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";
import { hash } from "bcryptjs";
import { ErrosDaAplicacao } from "../../../errosAplicacao/ErrosDaAplicacao";


interface IcriarPessoa {
    nome: string,
    sobrenome: string, 
    idade: number, 
    login: string, 
    senha: string,
    status: number;
}

export class CriarPessoa {
    private repositorios: IRepositorios;

    constructor(repositorio: IRepositorios) {
        this.repositorios = repositorio;
    }

    private async validaTodosOsCampus({ nome, sobrenome, idade, login, senha, status }: IcriarPessoa) {
        const repositorioPessoa = this.repositorios.pessoaRepositorio;

        if(!nome) {
            throw new ErrosDaAplicacao('Campo nome nao encontrado',  400);
        }
        else if(!sobrenome) {
            throw new ErrosDaAplicacao('Campo sobrenome nao encontrado' , 400);
        }
        else if(!idade || isNaN(idade)) {
            throw new ErrosDaAplicacao('Idade nao e um numero',  400);
        }
        else if(!login) {
            throw new ErrosDaAplicacao('Campo login nao encontrado', 400);
        }
        else if(!senha) {
            throw new ErrosDaAplicacao('Campo senha nao encontrado',  400);
        }
        else if(!status || isNaN(status) || !this.verificaStatusValido(Number(status))) {
            throw new ErrosDaAplicacao(`Status do campo invalido, valor do status: ${status}`,400);
        }

        const emailExiste = await repositorioPessoa.findOne({ where: { login: login } });
        
        if(emailExiste) {
            throw new ErrosDaAplicacao("Email ja cadastrado", 400);
        }
    }

    public async criarPessoa({ nome, sobrenome, idade, login, senha, status }: IcriarPessoa, requisicao: Request, resposta: Response) {
        try {

            const repositorioPessoa = this.repositorios.pessoaRepositorio;
            await this.validaTodosOsCampus({ nome, sobrenome, idade, login, senha, status });
            const criptografar = await hash(senha, 8);

            const novaPessoa = repositorioPessoa.create({
                nome: nome, sobrenome: sobrenome, idade: idade, login: login, senha: criptografar, status: status
            });

            await repositorioPessoa.save(novaPessoa);

            const pessoas = await repositorioPessoa.find({
                select: ["codigoPessoa", "nome", "sobrenome", "idade", "login", "senha", "status", "enderecos"],
                relations: ["enderecos"]
            });

            const todasAsPessoas = pessoas.map((pessoa) => ({
                codigoPessoa: pessoa.codigoPessoa,
                nome: pessoa.nome,
                sobrenome: pessoa.sobrenome,
                idade: pessoa.idade,
                login: pessoa.login,
                senha: pessoa.senha,
                status: pessoa.status,

                enderecos: pessoa.enderecos.map((endereco) => ({
                    codigoEndereco: endereco.codigoEndereco,
                    nomeRua: endereco.nomeRua,
                    numero: endereco.numero,
                    complemento: endereco.complemento,
                    cep: endereco.cep,
                    status: endereco.status
                }))
            }));

            return resposta.status(200).json(todasAsPessoas);

        }
        catch (error) {
            if(error instanceof ErrosDaAplicacao) {
                return resposta.status(error.status).json({ mensagem: error.message, status: error.status });
            }
            else {
                return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error});
            }
        }
    }

    private verificaStatusValido(status: number) {
        return status === 1 || status === 2;
    }
}
