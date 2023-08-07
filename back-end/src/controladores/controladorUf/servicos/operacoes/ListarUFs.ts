import { Request, Response } from "express";
import { IRepositorios } from "../../../../Irepositorios/Irepositorios";
import { Servicos } from "../Servicos";

interface IUF{
    codigoUF?: number,
    nome?: string, 
    sigla?: string,
    status?: number
}

export class ListarUFs extends Servicos{

    constructor(repositorio: IRepositorios){
        super(repositorio);
    }
    
    public async listarUf( requisicao: Request, resposta: Response){
        const {codigoUF ,nome, sigla, status} = requisicao.query;

        if(codigoUF || nome || sigla || status){
            if(!Number(status) || (Number(status) !== 1 && Number(status) !== 2)){
                if(status !== undefined){
                    return resposta.status(400).json({ mensagem: `Status invalido na busca, valor = ${status}`, status: 400});
                }
                    
            }
            this.listaFiltrada({ codigoUF: Number(codigoUF), 
                nome: nome as string, sigla: sigla as string, status: Number(status) },requisicao,resposta);
        }

        else{
            return resposta.status(200).json(await this.listarUfs());
        }
    }

    private async listaFiltrada({ codigoUF, nome, sigla, status }: IUF, requisicao: Request, resposta: Response) {
        
        try {
            let filtarDados: any = {};
            
            if(codigoUF) {
                filtarDados.codigoUF = Number(codigoUF);
            }

            if(nome) {
                filtarDados.nome = nome;
            }

            if(sigla) {
                filtarDados.sigla = sigla;
            }

            if(status !== undefined) {

                const statusNumero = Number(status);

                if(statusNumero === 1 || statusNumero === 2){
                    filtarDados.status = Number(status);
                }
               
            }
            
            const ufsFiltrados = await this.obterRepositorioUF().find({ where: filtarDados});
            
            return resposta.status(200).json(ufsFiltrados);

        }
        catch (error) {
            return resposta.status(400).json({ mensagem: 'Erro ao filtrar UFs', status: 400 , error });
        }
    }
}