import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";

interface IListaFiltrada{
    codigoBairro?: number,
    nome?: string, 
    status?: number
}
export class ListarBairro{
    private repositorios: IRepositorios;

    constructor(repositorio:IRepositorios){
        this.repositorios = repositorio;
    }

    public async listarBairro(requisicao: Request, resposta: Response){
        const repositorio = this.repositorios.bairroRepositorio;
        const {codigoBairro, nome, status} = requisicao.query;

        if(codigoBairro || nome || status){
            this.listaFiltrada({codigoBairro: Number(codigoBairro), nome: nome as string, status: Number(status)}, requisicao, resposta);
        }else{
            return resposta.status(200).json(await repositorio.find({relations:{enderecos:true}}));
        }
        
    }

    private async listaFiltrada({codigoBairro, nome, status}: IListaFiltrada, requisicao: Request, resposta: Response){
        try{
            let filtarBairros: any ={};

            if(codigoBairro){
                filtarBairros.codigoBairro = Number(codigoBairro);
            }
            if(nome){
                filtarBairros.nome = nome;
            }
            if(status !== undefined) {
                const statusNumero = Number(status);

                if(statusNumero === 0 || statusNumero === 1){
                    filtarBairros.status = Number(status);
                }
            }

            const bairrosFiltrados = await this.repositorios.bairroRepositorio.find({where:filtarBairros});
            return resposta.status(200).json(bairrosFiltrados);
        }catch(error){
            return resposta.status(400).json({mensagem: 'Erro ao filtrar os Bairros', status:'400' + error})
        }
    }
}