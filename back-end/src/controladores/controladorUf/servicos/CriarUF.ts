import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";
import { ErrosDaAplicacao } from "../../../errosAplicacao/ErrosDaAplicacao";
import { ListarUFs } from "./ListarUFs";

interface ICriarUf{
    nome: string,
    sigla: string,
    status: number
}
export class CriarUF{
    private repositorios: IRepositorios;

    constructor(repositorio: IRepositorios){
        this.repositorios = repositorio;
    }

    private async validarTodosOsCampus({nome, sigla, status}: ICriarUf, requisicao: Request, resposta: Response){
        const repositorioUF =  this.repositorios.ufRepositorio;

        if(!nome){
            throw new ErrosDaAplicacao('Campo nome nao encontrado', 400);
        }
        if(!sigla){
           throw new ErrosDaAplicacao('Campo sigla nao encontrado', 400);
        }
        if(!status || isNaN(status) || !this.verificaStatusValido(Number(status))){
           throw new ErrosDaAplicacao(`Status do campo invalido: Motivo = ${status}`, 400);
        }
        if(!this.verificaSiglaValida(sigla)){
            throw new ErrosDaAplicacao('Sigla invalida',  400);
        }

        const ufExiste = await repositorioUF.findOne({where: {nome: nome}});
        const siglaExiste = await repositorioUF.findOne({where: {sigla: sigla}});

        if(ufExiste){
            throw new ErrosDaAplicacao('Uf ja cadastrado no Banco de Dados',  400);
        }
        if(siglaExiste){
            throw new ErrosDaAplicacao('Sigla ja cadastarda no Banco de Dados' , 400);
        }
    }

    public async criarNovoUF({nome, sigla, status}: ICriarUf, requisicao: Request, resposta: Response){
        try{
            const repositorioUF =  this.repositorios.ufRepositorio;

            await this.validarTodosOsCampus({nome, sigla, status}, requisicao, resposta);

            const novoUf = repositorioUF.create({
                nome:nome, sigla:sigla, status:status
            })
    
            await repositorioUF.save(novoUf);

            return resposta.status(200).json(await repositorioUF.find({}));
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

    private verificaSiglaValida(sigla: String){
        if(sigla.length === 2){
            return true;
        }
        return false;
    }

    private verificaStatusValido(status: number){
        return status === 1 || status === 2;
    }
}