import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";
import { compare } from "bcryptjs";

interface Iautencicar{
    login: string, 
    senha: string,
}

export class AutenticacaoPessoa{
    private repositorios: IRepositorios;

    constructor(repositorio: IRepositorios) {
        this.repositorios = repositorio;
    }

    public async criarAutenticacao({login, senha}: Iautencicar,requisicao: Request,resposta: Response ){
        const pessoaRepositorio =  this.repositorios.pessoaRepositorio;
        const loginPessoa = await pessoaRepositorio.findOne({where: {login:login}});
        
        if(!loginPessoa){
            return resposta.status(400).json({mensagem: 'Email ou senha invalidos', status: '400'}); 
        }
        const senhaConfirmar = await compare(senha,loginPessoa.senha);

        if(!senhaConfirmar){
            return resposta.status(400).json({mensagem: 'Senha invalida', status: '400'})
        }
        
        return resposta.status(200).json(loginPessoa);
    
        
    }
}