import { Request, Response } from "express";
import { AutenticacaoPessoa } from "./servicos/AutenticacaoPessoa";
import { IRepositorios } from "../../Irepositorios/Irepositorios";


export class ControladorAutenticacao{
    private repositorios: IRepositorios;

    constructor(repositorio: IRepositorios) {
        this.repositorios = repositorio;
    }
    
    public async criarSecao(requisicao: Request,resposta: Response){
        const {login, senha} = requisicao.body;
        const criarSecao = new AutenticacaoPessoa(this.repositorios);

        const loginPessoa = await criarSecao.criarAutenticacao({login:login, senha:senha}, requisicao, resposta);


        return loginPessoa;
    }
}