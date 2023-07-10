import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";
import { municipioRepositorio } from "../../../repositorios/municipioRepositorio";

interface IcriarMunicipio{
    codigoUF: number,
    nome: string,
    status: number,
}
export class CriarMunicipio{
    private repositorioMunicipio: IRepositorios;
    
    constructor(repositorio: IRepositorios){
        this.repositorioMunicipio = repositorio;
    }

    public async criarNovoMunicipio({codigoUF, nome, status}: IcriarMunicipio, requisicao: Request, resposta: Response){
        const repositorio = this.repositorioMunicipio.municipioRepositorio;
        const repositorioUF = this.repositorioMunicipio.ufRepositorio;
        
        const ufExiste = await repositorioUF.findOne({where: {codigoUF: codigoUF}});

        const municipioExiste = await repositorio.createQueryBuilder("Municipio").where("Municipio.nome = :nome", { nome: nome })
                                                .andWhere("Municipio.codigoUF = :codigoUF", { codigoUF: codigoUF })
                                                .getOne();
                                                
        if(!ufExiste){
            return resposta.status(400).json({mensagem: 'Codigo Uf nao existe', status: '400'});
        }
        
        if(municipioExiste){
            return resposta.status(400).json({mensagem: 'Municipio ja existe', status: '400'});
        }

        const novoMuncipio = repositorio.create({
            codigoUF: {codigoUF:codigoUF}, nome: nome, status: status
        });

        await repositorio.save(novoMuncipio);
        return resposta.status(200).json(await repositorio.find({relations:{codigoUF:true}}));

    }
}