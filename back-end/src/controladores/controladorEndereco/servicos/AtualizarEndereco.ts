import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios"

interface IatualizarEndereco{
    codigoEndereco: number,
    nomeRua: string,
    numero: number,
    complemento: string,
    cep: string,
    status: number
}

export class AtualizarEndereco{
    private repositorios: IRepositorios;

    constructor(repositorio: IRepositorios) {
        this.repositorios = repositorio;
    }

    public async atualizarEndereco({codigoEndereco,nomeRua, numero, complemento, cep, status}: IatualizarEndereco, requisicao: Request, resposta: Response){
        const enderecoReposito = this.repositorios.enderecoRepositorio;
        const endereco = await enderecoReposito.findOne({where:{codigoEndereco:codigoEndereco}});

        if(!endereco){
            return resposta.status(400).json({mensagem:'Endereco nao encontrado', status:'400'});
        }

        endereco.nomeRua = nomeRua;
        endereco.numero = numero;
        endereco.complemento = complemento;
        endereco.cep = cep;
        endereco.status = status;

        await enderecoReposito.save(endereco);
        return resposta.status(200).json(await enderecoReposito.find({}));
        
    }
}