import { Request, Response } from "express";
import { IRepositorios } from "../../../../Irepositorios/Irepositorios";
import { ErrosDaAplicacao } from "../../../../errosAplicacao/ErrosDaAplicacao";

import { Servicos } from "../Servicos";

interface IMunicipio{
    codigoUF: number,
    nome: string,
    status: number,
}

export class CriarMunicipio extends Servicos{
      
    constructor(repositorio: IRepositorios){
        super(repositorio);
    }
    
    public async criarNovoMunicipio({codigoUF, nome, status}: IMunicipio, requisicao: Request, resposta: Response){
        try{
            const repositorioMunicipio = this.obterRepositorioMunicipio();

            await this.validaTodosOsCampus({codigoUF, nome, status});

            const novoMuncipio = repositorioMunicipio.create({
                uf: {codigoUF:codigoUF}, nome: nome, status: status
            });
    
            await repositorioMunicipio.save(novoMuncipio);
  
            const municipios = await repositorioMunicipio.find({
                select: ["codigoMunicipio", "nome", "status", "uf"],
                relations: ["uf"]
            });
            const todosMunicipios = this.listarMunicipios(municipios);

            return resposta.status(200).json(todosMunicipios);
            
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
}