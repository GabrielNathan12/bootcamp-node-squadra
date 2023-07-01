import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";

interface IdeletarUF{
    codigoUF: number
}
export class DeletarUF{
    private repositorioUf: IRepositorios;

    constructor(repositorio: IRepositorios){
        this.repositorioUf = repositorio;
    }
    public async deletarUF({codigoUF}: IdeletarUF, resposta: Response){
        const ufRepositorio =  this.repositorioUf.ufRepositorio;
        const ufExiste = await ufRepositorio.find({where: {codigoUF: codigoUF}});

        if(!ufExiste){
            return resposta.status(400).json({mensagem: 'UF nao existe', status: '400'});
        }
        
        await ufRepositorio.remove(ufExiste);

        return resposta.status(200).json(await ufRepositorio.find({}));
    }
}