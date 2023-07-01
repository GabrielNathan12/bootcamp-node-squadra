import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";

interface IcriarUf{
    nome: string,
    sigla: string,
    status: number
}
export class CriarUF{
    private repositorioUf: IRepositorios;

    constructor(repositorio: IRepositorios){
        this.repositorioUf = repositorio;
    }
    public async criarNovoUF({nome, sigla, status}: IcriarUf, requisicao: Request, resposta: Response){
        const ufRepositorio =  this.repositorioUf.ufRepositorio;
        const ufExiste = await ufRepositorio.findOne({where: {nome: nome}});
        const siglaExiste = await ufRepositorio.findOne({where: {sigla: sigla}});
        
        if(ufExiste){
            return resposta.status(400).json({mensagem: 'UF ja existe', status: '400'});
        }
        if(siglaExiste){
            return resposta.status(400).json({mensagem: 'Sigla ja existe', status: '400'});
        }

        const novoUf = ufRepositorio.create({
            nome:nome, sigla:sigla, status:status
        })

        await ufRepositorio.save(novoUf);

        return resposta.status(200).json(await ufRepositorio.find({}));
    }
}