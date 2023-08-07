import { Request, Response } from "express";
import { IRepositorios } from "../../../../Irepositorios/Irepositorios";
import { Servicos } from "../Servicos";
import { ErrosDaAplicacao } from "../../../../errosAplicacao/ErrosDaAplicacao";

interface IUF{
    codigoUF: number
}

export class DeletarUF extends Servicos{

    constructor(repositorio: IRepositorios){
        super(repositorio);
    }
    public async deletarUF({codigoUF}: IUF, resposta: Response){
        
        const ufExiste = await this.getRepositorios().find({where: {codigoUF: codigoUF}});

        if(!ufExiste){
            throw new ErrosDaAplicacao('codigoUF nao existe no Banco de Dados', 400);
        }
        
        await this.getRepositorios().remove(ufExiste);

        return resposta.status(200).json(await this.listarUfs());
    }
}