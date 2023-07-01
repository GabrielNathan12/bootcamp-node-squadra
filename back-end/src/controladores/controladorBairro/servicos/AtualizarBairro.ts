import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";

interface IatualizarBairro{
    codigoBairro: number,
    nome: string,
    status: number
}

export class AtualizarBairro{
    private repositorios: IRepositorios;

    constructor(repositorio: IRepositorios) {
        this.repositorios = repositorio;
    }

    public async atualizarBairro({codigoBairro, nome, status}: IatualizarBairro, requisicao: Request, resposta: Response){
        const repositorioBairro = this.repositorios.bairroRepositorio;

        const bairro = await repositorioBairro.findOne({where: {codigoBairro: codigoBairro}});


        if(!bairro){
            return resposta.status(400).json({mensagem: 'Bairro nao existe', status: '400'});
        }
        const bairroNome = await repositorioBairro.findOne({where: {nome: nome}});
        
        if(bairroNome && nome !== bairroNome.nome){
            return resposta.status(400).json({mensagem: 'Bairro ja existe', status: '400'});
        }

        bairro.nome = nome;
        bairro.status = status;

        await repositorioBairro.save(bairro);

        return resposta.status(200).json(await repositorioBairro.find({}));
    }
}