import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios"

interface IatualizarPessoa{
    codigoPessoa: number,
    nome: string,
    sobrenome: string,
    idade: number, 
    login: string,
    senha: string,
    status: number
}

export class AtualizarPessoa{
    private repositorios: IRepositorios;
    
    constructor(repositorio: IRepositorios) {
        this.repositorios = repositorio;    
    }
    
    public async atualizarPessoa({codigoPessoa,nome,sobrenome,idade,login,senha, status}:IatualizarPessoa, requisicao: Request, resposta: Response){
        const pessoaRepositorio = this.repositorios.pessoaRepositorio;
        const pessoa = await pessoaRepositorio.findOne({where: {codigoPessoa:codigoPessoa}});
        const loginPessoa = await pessoaRepositorio.findOne({where: {login:login}});

        if(!pessoa){
            return resposta.status(400).json({mensagem: 'Codigo pessoa nao encontrado', status:'400'});
        }
        if(loginPessoa && login !== pessoa?.login){
            return resposta.status(400).json({mensagem: 'Email ja usado na aplicacao', status: '400'})
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