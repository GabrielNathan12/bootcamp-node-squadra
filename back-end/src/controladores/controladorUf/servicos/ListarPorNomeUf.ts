import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";

interface INomeUf{
    nome: string
}

export class ListarPorNomeUf{
    private repositorioUf: IRepositorios;

    constructor(repositorio: IRepositorios){
        this.repositorioUf = repositorio;
    }
    public async listarPorNome({nome}: INomeUf, requisicao: Request, resposta: Response){

        const ufRepositorio =  this.repositorioUf.ufRepositorio;
        const nomeUf = ufRepositorio.findOne({where: {nome: nome}});
        
        if(!nomeUf){
            return resposta.status(400).json({mensagem: 'Nome Uf nao encontrado', status: '400'});
        }
        return resposta.status(200).json(nomeUf);
    }
}