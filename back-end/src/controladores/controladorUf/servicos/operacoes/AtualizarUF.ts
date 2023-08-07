import { Request, Response } from "express";
import { IRepositorios } from "../../../../Irepositorios/Irepositorios";
import { Servicos } from "../Servicos";
import { ErrosDaAplicacao } from "../../../../errosAplicacao/ErrosDaAplicacao";

interface IUF{
    codigoUF: number,
    nome: string,
    sigla: string,
    status: number
}

export class AtualizarUF extends Servicos{
   
    constructor(repositorio: IRepositorios){
        super(repositorio);
    }

    protected async validarTodosOsCampus({codigoUF, nome, sigla, status}: IUF){
        const repositorioUF = this.getRepositorios();
        
        if(!codigoUF || isNaN(codigoUF)){
            throw new ErrosDaAplicacao(`Campo codigoUF invalido, Motivo: ${codigoUF}`, 400);
        }
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
        const uf = await repositorioUF.findOne({where:{ codigoUF: codigoUF}});

        if(!uf){
            throw new ErrosDaAplicacao('UF nao encontrado no Banco de Dados',  400);
        }

        const ufNome = await repositorioUF.findOne({where: {nome: nome}});
        
        if(ufNome && nome !== uf.nome){
            throw new ErrosDaAplicacao('UF ja cadastrado no Banco de Dados', 400);    
        }

        const ufSigla = await repositorioUF.findOne({where: {sigla: sigla}});

        if(ufSigla && sigla !== uf.sigla){
            throw new ErrosDaAplicacao('Sigla ja cadastrado no Banco de Dados', 400);            
        }
        
        uf.nome = nome;
        uf.sigla = sigla;
        uf.status = status;

        await this.getRepositorios().save(uf);
        
    }
    
    public async atualizarUf({codigoUF, nome, sigla, status}: IUF, requisicao: Request, resposta: Response){

        try{
            await this.validarTodosOsCampus({codigoUF,nome, sigla, status});

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