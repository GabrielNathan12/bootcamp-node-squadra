import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";

interface IdeletarBairro{
    codigoBairro: number;
}

export class DeletarBairro{
    private repositorios: IRepositorios;
    
    constructor(repositorio: IRepositorios) {
        this.repositorios = repositorio;    
    }
    public async deletarBairro({codigoBairro}: IdeletarBairro, requisicao: Request, resposta: Response){
        const bairroRepositorio = this.repositorios.bairroRepositorio;
        const bairroExiste = await bairroRepositorio.find({where: {codigoBairro: codigoBairro}});

        if(!bairroExiste){
            return resposta.status(400).json({mensagem: 'Municipio nao existe', status: '400'});
        }
        await bairroRepositorio.remove(bairroExiste);
        return resposta.status(200).json(await bairroRepositorio.find({}));
    }
}