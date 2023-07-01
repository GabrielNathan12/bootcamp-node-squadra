import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";

export class ListarPessoa{
    private repositorios: IRepositorios;
    constructor(repositorio: IRepositorios) {
        this.repositorios = repositorio;
    }
    public async listarPessoas(requisicao:Request, resposta: Response){
        const pessoaRepositorio = this.repositorios.pessoaRepositorio;
        return resposta.status(200).json(await pessoaRepositorio.find({})); 
    }
}