import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";

export class ListarUFs{
    private repositorioUf: IRepositorios;

    constructor(repositorio: IRepositorios){
        this.repositorioUf = repositorio;
    }
    public async listarUf(requisicao: Request, resposta: Response){
        const ufRepositorio =  this.repositorioUf.ufRepositorio;

        return resposta.status(200).json(await ufRepositorio.find({}));
    }
}