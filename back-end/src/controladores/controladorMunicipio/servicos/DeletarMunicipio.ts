import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";

interface IdeletarMunicipio{
    codigoMunicipio: number;
}

export class DeletarMunicipio{
    private repositorioMunicipio: IRepositorios;
    
    constructor(repositorio: IRepositorios) {
        this.repositorioMunicipio = repositorio;    
    }
    public async deletarMunicipio({codigoMunicipio}: IdeletarMunicipio, requisicao: Request, resposta: Response){
        const municipioRepositorio = this.repositorioMunicipio.municipioRepositorio;
        const municipioExiste = await municipioRepositorio.find({where: {codigoMunicipio: codigoMunicipio}});

        if(!municipioExiste){
            return resposta.status(400).json({mensagem: 'Municipio nao existe', status: '400'});
        }
        await municipioRepositorio.remove(municipioExiste);
        return resposta.status(200).json(await municipioRepositorio.find({}));
    }
}