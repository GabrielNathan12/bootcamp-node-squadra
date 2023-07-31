    import { Request, Response } from "express";
    import { IRepositorios } from "../../../Irepositorios/Irepositorios";

    interface IListaFiltrada{
        codigoMunicipio?:number, 
        nome?:string,
        status?:number,
    }

    export class ListarMunicipio{
        private repositorioMunicipio: IRepositorios;

        constructor(repositorio: IRepositorios) {
            this.repositorioMunicipio = repositorio;
        }
        public async listarMunicipio(requisicao: Request, resposta: Response){
            const municipioRepositorio = this.repositorioMunicipio.municipioRepositorio;
            
            const {codigoMunicipio, nome, status} = requisicao.query;

            if(codigoMunicipio || nome|| status){
                this.listFiltrada({codigoMunicipio: Number(codigoMunicipio), nome: nome as string, status: Number(status)}, requisicao, resposta);
            }else{
                return resposta.status(200).json(await municipioRepositorio.find({relations:{bairros:true}}));
            }
            
        }

        private async listFiltrada({codigoMunicipio, nome, status}: IListaFiltrada, requisicao:Request, resposta: Response){
            try{
                let filtrarMunicipio: any = {};

                if(codigoMunicipio){ 
                    filtrarMunicipio.codigoMunicipio = Number(codigoMunicipio);
                }
                if(nome){
                    filtrarMunicipio.nome = nome;
                }
                if(status !== undefined) {
                    const statusNumero = Number(status);
    
                    if(statusNumero === 0 || statusNumero === 1){
                        filtrarMunicipio.status = Number(status);
                    }
                }

                const municipiosFiltrados = await this.repositorioMunicipio.municipioRepositorio.find({where: filtrarMunicipio});
                
                return resposta.status(200).json(municipiosFiltrados);
            }
            catch(error){
                resposta.status(400).json({mensagem: 'Erro ao filtrar os municipios', status: '400' + error})
            }
        }
    }