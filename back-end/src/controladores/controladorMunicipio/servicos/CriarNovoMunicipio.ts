import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";
import { municipioRepositorio } from "../../../repositorios/municipioRepositorio";
import { ErrosDaAplicacao } from "../../../errosAplicacao/ErrosDaAplicacao";
import { ListarMunicipio } from "./ListarMunicipio";

interface ICriarMunicipio{
    codigoUF: number,
    nome: string,
    status: number,
}
export class CriarMunicipio{
    private repositorios: IRepositorios;
    
    constructor(repositorio: IRepositorios){
        this.repositorios = repositorio;
    }

    private async validaTodosOsCampus({codigoUF, nome, status}: ICriarMunicipio){
        const repositorioMunicipio = this.repositorios.municipioRepositorio;
        const repositorioUF = this.repositorios.ufRepositorio;
        
        const ufExiste = await repositorioUF.findOne({where: {codigoUF: codigoUF}});

        if(!codigoUF){
            throw new ErrosDaAplicacao('Campo codigoUF nao encontrado', 400);
        }
        if(!nome){
            throw new ErrosDaAplicacao('Campo nome nao encontrado',400);
        }
        if(!status || isNaN(status) || !this.verificaStatusValido(status)){
            throw new ErrosDaAplicacao(`Status do campo invalido: Motivo = ${status}`, 400);
        }

        const municipioExiste = await repositorioMunicipio.createQueryBuilder("Municipio").where("Municipio.nome = :nome", { nome: nome })
                                                .andWhere("Municipio.codigoUF = :codigoUF", { codigoUF: codigoUF })
                                                .getOne();
                                                
        if(!ufExiste){
            throw new ErrosDaAplicacao('codigoUF nao encontrado no Banco de Dados', 400);
        }
        
        if(municipioExiste){
            throw new ErrosDaAplicacao('Municipio ja cadastrado nesse UF', 400);
        }
    }
    
    public async criarNovoMunicipio({codigoUF, nome, status}: ICriarMunicipio, requisicao: Request, resposta: Response){
        try{
            const repositorioMunicipio = this.repositorios.municipioRepositorio;

            await this.validaTodosOsCampus({codigoUF, nome, status});

            const novoMuncipio = repositorioMunicipio.create({
                codigoUF: {codigoUF:codigoUF}, nome: nome, status: status
            });
    
            await repositorioMunicipio.save(novoMuncipio);
            
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
            
        }
        catch(error){
            if(error instanceof ErrosDaAplicacao){
                return resposta.status(error.status).json({ mensagem: error.message, status: error.status });
            }
            else {
                return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error});
            }
            
        }
    }
    
    private verificaStatusValido(status: number){
        return status === 1 || status === 2;
    }
}