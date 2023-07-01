import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";

export class ListaEndereco{
    private repositorios: IRepositorios;
    constructor(repositorio: IRepositorios) {
        this.repositorios = repositorio;
    }
    public async litaEndereco(requisicao: Request, reposta:Response){
        const enderecoReposito = this.repositorios.enderecoRepositorio;

        return reposta.status(200).json(await enderecoReposito.find({relations:{codigoBairro: true, codigoPessoa:true}}));
        
    }
}