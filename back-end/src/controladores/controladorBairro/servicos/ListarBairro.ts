import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";

interface IListaFiltrada{
    codigoBairro?: number,
    codigoMunicipio?: number,
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
        const {codigoBairro,codigoMunicipio ,nome, status} = requisicao.query;

        if(codigoBairro || codigoMunicipio ||nome || status){
            if(!Number(status) || (Number(status) !== 1 && Number(status) !== 2)){
                if(status !== undefined){
                    return resposta.status(400).json({ mensagem: `Status invalido na busca, valor = ${status}`, status: '400'});
                }
            }
            this.listaFiltrada({codigoBairro: Number(codigoBairro),codigoMunicipio:Number(codigoMunicipio), 
                nome: nome as string, status: Number(status)}, requisicao, resposta);
        }
        else{
            try{
                const bairros = await repositorio.find({
                    select:["codigoBairro", "codigoMunicipio", "nome", "status"], 
                    relations:["codigoMunicipio"]
                });
                const todosBairros = bairros.map((bairro) => ({
                    codigoBairro: bairro.codigoBairro,
                    codigoMunicipio: bairro.codigoMunicipio.codigoMunicipio,
                    nome: bairro.nome,
                    status: bairro.status
                }));
                return resposta.status(200).json(todosBairros);

            }
            catch(error){
                return resposta.status(400).json({mensagem: "Erro ao listar os bairros", error})
            }

        }
        
    }

    private async listaFiltrada({codigoBairro,codigoMunicipio ,nome, status}: IListaFiltrada, requisicao: Request, resposta: Response){
        try{
            let filtarBairros: any ={};

            if(codigoBairro){
                filtarBairros.codigoBairro = Number(codigoBairro);
            }
            if(nome){
                filtarBairros.nome = nome;
            }
            if(codigoMunicipio){
                filtarBairros.codigoMunicipio = codigoMunicipio;
            }
            if(status !== undefined) {
                const statusNumero = Number(status);

                if(statusNumero === 1 || statusNumero === 2){
                    filtarBairros.status = Number(status);
                }
            }

            const bairrosFiltrados = await this.repositorios.bairroRepositorio.find({
                where:filtarBairros, select:['codigoBairro',"codigoMunicipio",'nome', "status"], 
                relations: ["codigoMunicipio"]
            });
            
            const todosBairros= bairrosFiltrados.map((bairro)=> ({
                codigoBairro: bairro.codigoBairro,
                codigoMunicipio: bairro.codigoMunicipio.codigoMunicipio,
                nome: bairro.nome,
                status: bairro.status
            }));

            return resposta.status(200).json(todosBairros);
        }catch(error){
            return resposta.status(400).json({mensagem: 'Erro ao filtrar os Bairros', status:400, error})
        }
    }
}