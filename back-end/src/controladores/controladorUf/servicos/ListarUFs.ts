import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";
interface IListaFiltrada{
    codigoUF?: number,
    nome?: string, 
    sigla?: string,
    status?: number
}
export class ListarUFs{
    private repositorioUf: IRepositorios;

    constructor(repositorio: IRepositorios){
        this.repositorioUf = repositorio;
    }
    
    public async listarUf( requisicao: Request, resposta: Response){
        const ufRepositorio =  this.repositorioUf.ufRepositorio;
        const {codigoUF ,nome, sigla, status} = requisicao.query;

        if(codigoUF || nome || sigla || status){

            this.listaFiltrada({ codigoUF: Number(codigoUF), nome: nome as string, sigla: sigla as string, status: Number(status) },requisicao,resposta);
        }

        else{
            return resposta.status(200).json(await ufRepositorio.find({}));
        }
    }

    private async listaFiltrada({ codigoUF, nome, sigla, status }: IListaFiltrada, requisicao: Request, resposta: Response) {
        
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

            if(status) {
                filtarDados.status = Number(status);
            }
            
            const ufsFiltrados = await this.repositorioUf.ufRepositorio.find({ where: filtarDados });
            
            return resposta.status(200).json(ufsFiltrados);

        }
        catch (error) {
            return resposta.status(400).json({ mensagem: 'Erro ao filtrar UFs', status: '400'+ error });
        }
    }
}