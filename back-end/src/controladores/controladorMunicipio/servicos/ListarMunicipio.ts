import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";

export class ListarMunicipio{
    private repositorioMunicipio: IRepositorios;

    constructor(repositorio: IRepositorios) {
        this.repositorioMunicipio = repositorio;
    }
    public async listarMunicipio(requisicao: Request, resposta: Response){
        const municipioRepositorio = this.repositorioMunicipio.municipioRepositorio;
        return resposta.status(200).json(await municipioRepositorio.find({relations:{bairros:true}}));
    }
}