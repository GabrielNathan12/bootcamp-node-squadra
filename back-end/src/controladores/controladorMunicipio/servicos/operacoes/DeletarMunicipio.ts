import { Request, Response } from "express";
import { IRepositorios } from "../../../../Irepositorios/Irepositorios";
import { Servicos } from "../Servicos";

interface IMunicipio{
    codigoMunicipio: number;
}

export class DeletarMunicipio extends Servicos{
    
    constructor(repositorio: IRepositorios) {
       super(repositorio);    
    }
    
    public async deletarMunicipio({codigoMunicipio}: IMunicipio, requisicao: Request, resposta: Response){
        const municipioRepositorio = this.obterRepositorioMunicipio();
        const municipioExiste = await municipioRepositorio.find({where: {codigoMunicipio: codigoMunicipio}});

        if(!municipioExiste){
            return resposta.status(400).json({mensagem: 'Municipio nao cadastrado', status: 400});
        }
        
        await municipioRepositorio.remove(municipioExiste);

        const municipios = await this.obterRepositorioMunicipio().find({
            select: ["codigoMunicipio", "nome", "status", "uf"],
            relations: ["uf"]
        });

        const todosMunicipios = this.listarMunicipios(municipios);

        return resposta.status(200).json(todosMunicipios);
    }
}