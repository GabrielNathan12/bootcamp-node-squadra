import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";

interface IcriarPessoa{
    nome: string,
    sobrenome: string, 
    idade: number, 
    login: string, 
    senha: string,
    status: number;
}
export class CriarPessoa{
    private repositorios: IRepositorios;

    constructor(repositorio: IRepositorios) {
        this.repositorios = repositorio;
    }

    public async criarPessoa({nome, sobrenome, idade, login, senha, status}: IcriarPessoa,requisicao: Request,resposta: Response ){
        const pessoaRepositorio =  this.repositorios.pessoaRepositorio;
        const novaPessoa = pessoaRepositorio.create({
            nome:nome, sobrenome:sobrenome, idade:idade,login: login, senha:senha, status: status
        });

        await pessoaRepositorio.save(novaPessoa);
        return resposta.status(200).json(await pessoaRepositorio.find({}));
    }
}