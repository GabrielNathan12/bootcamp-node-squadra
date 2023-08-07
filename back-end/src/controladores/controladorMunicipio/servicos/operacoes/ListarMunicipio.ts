import { Request, Response } from "express";
import { IRepositorios } from "../../../../Irepositorios/Irepositorios";
import { Servicos } from "../Servicos";

interface IMunicipio{
    codigoMunicipio?:number,
    codigoUF?:number,
    nome?:string,
    status?:number,
}

export class ListarMunicipio extends Servicos{

    constructor(repositorio: IRepositorios) {
        super(repositorio);
    }
    
    public async listarMunicipio(requisicao: Request, resposta: Response){
        
        const {codigoMunicipio, codigoUF ,nome, status} = requisicao.query;

        if(codigoMunicipio || nome|| status || codigoUF) {
            if(!Number(status) || (Number(status) !== 1 && Number(status) !== 2)){
                if(status !== undefined){
                    return resposta.status(400).json({ mensagem: `Status invalido na busca, valor = ${status}`, status: '400'});
                }
            }
            this.listFiltrada({
                    codigoMunicipio: Number(codigoMunicipio),codigoUF:Number(codigoUF),
                    nome: nome as string, status: Number(status)}, requisicao, resposta);
        }
        else {
            const municipios = await this.getRepositorio().find({
                select: ["codigoMunicipio", "nome", "status", "codigoUF"],
                relations: ["codigoUF"]
            });
            const todosMunicipios = this.listarMunicipios(municipios);

            return resposta.status(200).json(todosMunicipios);
        }
    }

    private async listFiltrada({codigoMunicipio,codigoUF ,nome, status}: IMunicipio, requisicao:Request, resposta: Response){
        try{
            let filtrarMunicipio: any = {};

            if(codigoMunicipio){ 
                filtrarMunicipio.codigoMunicipio = Number(codigoMunicipio);
            }
            if(nome){
                filtrarMunicipio.nome = nome;
            }
            if(codigoUF){
                filtrarMunicipio.codigoUF = codigoUF;
            }

            if(status !== undefined) {
                const statusNumero = Number(status);

                if(statusNumero === 1 || statusNumero === 2){
                    filtrarMunicipio.status = Number(status);
                }
            }
            
            const municipiosFiltrados = await this.getRepositorio().find({
                where:filtrarMunicipio,  
                select: ["codigoMunicipio", "nome", "status", "codigoUF"],
                relations: ["codigoUF"]
            });

            const todosMunicipios = this.listarMunicipios(municipiosFiltrados);

            return resposta.status(200).json(todosMunicipios);
        }
        catch(error){
            resposta.status(400).json({mensagem: 'Erro ao filtrar os municipios', status: 400, error})
        }
    }
}