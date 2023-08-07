import { Request, Response } from "express";
import { IRepositorios } from "../../../../Irepositorios/Irepositorios";
import { ErrosDaAplicacao } from "../../../../errosAplicacao/ErrosDaAplicacao";
import { Servicos } from "../Servicos";

interface IUF{
    nome: string,
    sigla: string,
    status: number
}

export class CriarUF extends Servicos{

    constructor(repositorio: IRepositorios){
        super(repositorio);
    }

    public async criarNovoUF({nome, sigla, status}:IUF, requisicao: Request, resposta: Response){
        try{
            const repositorioUF =  this.obterRepositorioUF();

            await this.validarTodosOsCampus({nome, sigla, status});

            const novoUf = repositorioUF.create({
                nome:nome, sigla:sigla, status:status
            })
    
            await repositorioUF.save(novoUf);

            return resposta.status(200).json(await this.listarUfs());
        }
        catch(error){
            if(error instanceof ErrosDaAplicacao){
                return resposta.status(error.status).json({ mensagem: error.message, status: error.status });
            }
            else{
                return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error});
            }
        }
    }
}