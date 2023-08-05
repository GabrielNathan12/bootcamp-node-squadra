    import { Request, Response } from "express";
    import { IRepositorios } from "../../../Irepositorios/Irepositorios";

    interface IListaFiltrada{
        codigoMunicipio?:number,
        codigoUF?:number,
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
                try{
                    const municipios = await municipioRepositorio.find({
                        select: ["codigoMunicipio", "nome", "status", "codigoUF"],
                        relations: ["codigoUF"]
                    });
    
                    const todosOsMunicipios = municipios.map((municipio) => ({
                        codigoMunicipio: municipio.codigoMunicipio,
                        codigoUF: municipio.codigoUF.codigoUF,
                        nome: municipio.nome,
                        status: municipio.status
                    }));
    
                    return resposta.status(200).json(todosOsMunicipios);
                }catch(error){
                    return resposta.status(400).json({mensagem: "Erro ao listar os municipios", error})
                }
            }
        }

        private async listFiltrada({codigoMunicipio,codigoUF ,nome, status}: IListaFiltrada, requisicao:Request, resposta: Response){
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
                
                const municipiosFiltrados = await this.repositorioMunicipio.municipioRepositorio.find(
                    {
                        where: filtrarMunicipio,
                        select: ["codigoMunicipio", "nome", "status", "codigoUF"],
                        relations: ["codigoUF"]
                    });

                
                const todosOsMunicipios = municipiosFiltrados.map((municipio) => ({
                        codigoMunicipio: municipio.codigoMunicipio,
                        codigoUF: municipio.codigoUF.codigoUF,
                        nome: municipio.nome,
                        status: municipio.status
                }));
    
                    return resposta.status(200).json(todosOsMunicipios);
            }
            catch(error){
                resposta.status(400).json({mensagem: 'Erro ao filtrar os municipios', status: 400, error})
            }
        }
    }