import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";

interface IdeletarPessoa{
    codigoPessoa: number;
}

export class DeletarPessoa{
    private repositorios: IRepositorios;
    constructor(repositorio: IRepositorios) {
        this.repositorios = repositorio;
    }
    public async deletarPessoa({codigoPessoa}:IdeletarPessoa, requisicao: Request, resposta: Response){
        const pessoaRepositorio = this.repositorios.pessoaRepositorio;
        const pessoa = await pessoaRepositorio.findOne({where: {codigoPessoa: codigoPessoa}});

        if(!pessoa){
            return resposta.status(400).json({mensagem:'Pessoa nao encontrada', status:'400'});
        }
        await pessoaRepositorio.remove(pessoa);

        return resposta.status(200).json(await pessoaRepositorio.find({}));
    }
}