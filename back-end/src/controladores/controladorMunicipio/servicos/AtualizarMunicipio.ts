import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";

interface IatualizarMunicipio{
    codigoMunicipio: number,
    nome: string, 
    status: number
}

export class AtualizarMunicipio{
    private repositorioMunicipio: IRepositorios;

    constructor(repositorio: IRepositorios) {
        this.repositorioMunicipio = repositorio;
    }
    public async atualizarMunicipio({codigoMunicipio, nome, status}: IatualizarMunicipio, requisicao: Request, resposta: Response){
        const municipioRepositorio = this.repositorioMunicipio.municipioRepositorio;
        const municipio = await municipioRepositorio.findOne({where: {codigoMunicipio: codigoMunicipio}});

        if(!municipio){
            return resposta.status(400).json({mensagem: 'Municipio nao existe', status:'400'});
        }
        const municipioNome = await municipioRepositorio.findOne({where: {nome:nome}});
        
        if(municipioNome && nome !== municipio.nome){
            return resposta.status(400).json({mensagem: 'Nome do municio ja existe', status: '400'});
        }
        if(!Number(status)){
            return resposta.status(400).json({mensagem: "Status nao e um numero", status: 400});
        }
        municipio.nome = nome;
        municipio.status = status;
        
        await municipioRepositorio.save(municipio);

        return resposta.status(200).json(await municipioRepositorio.find({}));
    }
}