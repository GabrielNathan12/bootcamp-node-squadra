import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";
interface IcriarBairro{
    codigoMunicipio: number,
    nome: string,
    status: number
}
export class CriarBairro{
    private repositorios: IRepositorios;

    constructor(repositorio: IRepositorios) {
        this.repositorios = repositorio;
    }

    public async criarBairro({codigoMunicipio, nome, status}: IcriarBairro, requisicao: Request, resposta: Response){
        const repositorioBairro = this.repositorios.bairroRepositorio;
        const repositorioMunicipio = this.repositorios.municipioRepositorio;

        const municipioExiste = await repositorioMunicipio.findOne({where: {codigoMunicipio: codigoMunicipio}});
        const bairroExiste = await repositorioBairro.findOne({where: {nome: nome}});

        if(!municipioExiste){
            return resposta.status(400).json({mensagem: 'Municipio nao existe', status:'400'});
        }

        if(bairroExiste){
            return resposta.status(400).json({mensagem: 'Bairro ja existe', status: '400'});
        }

        const novoBairro = repositorioBairro.create({
            codigoMunicipio:{codigoMunicipio}, nome: nome, status: status
        });

        await repositorioBairro.save(novoBairro);

        return resposta.status(200).json(await repositorioBairro.find({}));
    }
}