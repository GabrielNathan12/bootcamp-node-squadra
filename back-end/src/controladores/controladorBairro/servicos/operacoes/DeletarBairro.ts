import { Request, Response } from "express";
import { IRepositorios } from "../../../../Irepositorios/Irepositorios";
import { Servicos } from "../Servicos";

interface IBairro{
    codigoBairro: number;
}

export class DeletarBairro extends Servicos{
    
    constructor(repositorio: IRepositorios) {
        super(repositorio);    
    }
    
    public async deletarBairro({codigoBairro}: IBairro, requisicao: Request, resposta: Response){
        const bairroRepositorio = this.getRepositorio();

        const bairroExiste = await bairroRepositorio.find({where: {codigoBairro: codigoBairro}});

        if(!bairroExiste){
            return resposta.status(400).json({mensagem: 'Bairro nao cadastrado', status: 400});
        }

        await bairroRepositorio.remove(bairroExiste);

        const bairros = await bairroRepositorio.find({
            select:["codigoBairro", "codigoMunicipio", "nome", "status"], 
            relations:["codigoMunicipio"]
        });

        const todosBairros = this.listarBairros(bairros);

        return resposta.status(200).json(todosBairros);
    }
}