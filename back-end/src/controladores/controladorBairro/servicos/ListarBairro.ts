import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";

export class ListarBairro{
    private repositorios: IRepositorios;

    constructor(repositorio:IRepositorios){
        this.repositorios = repositorio;
    }

    public async listarBairro(requisicao: Request, resposta: Response){
        const repositorio = this.repositorios.bairroRepositorio;
        return resposta.status(200).json(await repositorio.find({}));
    }
}