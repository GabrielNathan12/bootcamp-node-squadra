import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";
import { hash } from "bcryptjs";

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
        const loginPessoa = await pessoaRepositorio.findOne({where: {login:login}});
        const criptografar = await hash(senha, 8);
        
        const emailExiste = this.repositorios.pessoaRepositorio.findOne({where: {login:login}});

        if(emailExiste !== null){
            return resposta.status(400).json({mensagem: "Email ja cadastrado", status: 400});
        }

        if(!loginPessoa){
            const novaPessoa = pessoaRepositorio.create({
                nome:nome, sobrenome:sobrenome, idade:idade,login: login, senha:criptografar, status: status
            });
           
            await pessoaRepositorio.save(novaPessoa);
            return resposta.status(200).json(await pessoaRepositorio.find({}));    
        }
        else if(loginPessoa){
            return resposta.status(400).json({mensagem: 'Email ja usado na aplicacao', status: '400'}); 
        }
        
    }
}