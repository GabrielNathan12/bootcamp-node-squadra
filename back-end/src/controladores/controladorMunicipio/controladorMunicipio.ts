import {  Request, Response } from "express-serve-static-core";
import { IRepositorios } from "../../Irepositorios/Irepositorios";
import { ListarMunicipio } from "./servicos/ListarMunicipio";
import { CriarMunicipio } from "./servicos/CriarNovoMunicipio";
import { AtualizarMunicipio } from "./servicos/AtualizarMunicipio";
import { DeletarMunicipio } from "./servicos/DeletarMunicipio";

export class ControladorMunicipio{
    
    private repositorio : IRepositorios;

    constructor(repositorios: IRepositorios){
        this.repositorio = repositorios;
    }

    public async listarMunicipio(requisicao: Request, resposta: Response){
        try{
            const listarMunicipio = new ListarMunicipio(this.repositorio);
            const municipio = await listarMunicipio.listarMunicipio(requisicao, resposta);
            return municipio;
        }catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: '500', error});
        }
    }

    public async criarMunicipio(requisicao: Request, resposta: Response){
        try{
            const {codigoUF, nome, status} = requisicao.body;
            const criarNovoMunicipio = new CriarMunicipio(this.repositorio);
            
            if(!codigoUF || !nome || !status){
                return resposta.status(400).json({mensagem: 'Erro ao encontrar dados no Json', status: '400'});
            }
            if(!this.verificaStatus(Number(status))){
                return resposta.status(400).json({mensagem: 'Status do campo invalido', status: '400'});
            }    
            const novoMuncipio = await criarNovoMunicipio.criarNovoMunicipio({codigoUF, nome, status}, requisicao, resposta);
            return novoMuncipio;

        }catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: '500', error});
        }
    }
    public async atualizarMunicipio(requisicao: Request, resposta: Response){
        try{
            const {codigoMunicipio, nome, status} = requisicao.body;
            const atualizar = new AtualizarMunicipio(this.repositorio);
            
            if(!codigoMunicipio || !nome || !status){
                return resposta.status(400).json({mensagem: 'Erro ao encontrar dados no Json', status: '400'});
            }
            if(!this.verificaStatus(Number(status))){
                return resposta.status(400).json({mensagem: 'Status do campo invalido', status: '400'});
            }

            const municipio = await atualizar.atualizarMunicipio({codigoMunicipio, nome, status}, requisicao, resposta);
            
            return municipio;
        }catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: '500', error});
        }
    }
    
    public async deletarMunicipio(requisicao: Request, resposta: Response){
        try{
            const {codigoMunicipio} = requisicao.params;
            const deletarPeloId = new DeletarMunicipio(this.repositorio);
            const deletado = await deletarPeloId.deletarMunicipio({codigoMunicipio: Number(codigoMunicipio)}, requisicao, resposta);
            return deletado;
        }catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: '500', error});
        }
        
    }
    private verificaStatus(status: number){
        if(status == 0 || status == 1){
            return true;
        }
        return false;
    }

}