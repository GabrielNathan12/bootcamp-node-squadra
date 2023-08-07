import {  Request, Response } from "express-serve-static-core";
import { IRepositorios } from "../../Irepositorios/Irepositorios";
import { ListarMunicipio } from "./servicos/operacoes/ListarMunicipio";
import { CriarMunicipio } from "./servicos/operacoes/CriarMunicipio";
import { AtualizarMunicipio } from "./servicos/operacoes/AtualizarMunicipio";
import { DeletarMunicipio } from "./servicos/operacoes/DeletarMunicipio";

export class ControladorMunicipio{
    
    private repositorio : IRepositorios;

    constructor(repositorios: IRepositorios){
        this.repositorio = repositorios;
    }

    public async listarMunicipio(requisicao: Request, resposta: Response){
        try{
            const listarMunicipio = new ListarMunicipio(this.repositorio);
            await listarMunicipio.listarMunicipio(requisicao, resposta);
        }
        catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: 500, error});
        }
    }

    public async criarMunicipio(requisicao: Request, resposta: Response){
        try{
            const {codigoUF, nome, status} = requisicao.body;
            const criarNovoMunicipio = new CriarMunicipio(this.repositorio);
            await criarNovoMunicipio.criarNovoMunicipio({codigoUF, nome, status}, requisicao, resposta);

        }
        catch(error){
            return resposta.status(500).json({mensagem: "Erro interno no servidor", status: 500 ,error})
        }
        
    }
    
    public async atualizarMunicipio(requisicao: Request, resposta: Response){
        try{
            const {codigoMunicipio,codigoUF ,nome, status} = requisicao.body;
            const atualizar = new AtualizarMunicipio(this.repositorio);

            await atualizar.atualizarMunicipio({codigoMunicipio, codigoUF,nome, status}, requisicao, resposta);
        }
        catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: 500, error});
        }
    }
    
    public async deletarMunicipio(requisicao: Request, resposta: Response){
        try{
            const {codigoMunicipio} = requisicao.params;

            const deletarPeloId = new DeletarMunicipio(this.repositorio);

            await deletarPeloId.deletarMunicipio({codigoMunicipio: Number(codigoMunicipio)}, requisicao, resposta);
        }
        catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: 500, error});
        }
        
    }

}