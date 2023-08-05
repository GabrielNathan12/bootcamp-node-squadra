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

        const municipios = await municipioRepositorio.find({
            select: ["codigoMunicipio", "nome", "status", "codigoUF"],
            relations: ["codigoUF"]
        });

        const todosOsMunicipios = municipios.map((municipio) => ({
            codigoMunicipio: municipio.codigoMunicipio,
            codigoUF: municipio.codigoUF.codigoUF,
            nome: municipio.nome,
            status: municipio.status
        }));

        return resposta.status(200).json(todosOsMunicipios);
    }
}