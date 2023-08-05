import {Request, Response } from "express-serve-static-core";
import { IRepositorios } from "../../Irepositorios/Irepositorios";
import { CriarBairro } from "./servicos/CriarBairro";
import { ListarBairro } from "./servicos/ListarBairro";
import { AtualizarBairro } from "./servicos/AtualizarBairro";
import { DeletarBairro } from "./servicos/DeletarBairro";

export class ControladorBairro{
    private repositorios: IRepositorios;
    
    constructor(repositorio: IRepositorios){
        this.repositorios = repositorio;
    }

    public async criarBairro(requisicao: Request, resposta: Response){
        try{
            const {codigoMunicipio, nome, status} = requisicao.body;
            const criarNovoBairro = new CriarBairro(this.repositorios);
            
            if(codigoMunicipio === undefined || nome === undefined || status === undefined){
                return resposta.send(400).json({mensagem: 'Erro ao encontrar os campus no Json', status: '400'});
            }
            if(!Number(status)){
                return resposta.status(400).json({mensagem: "Status nao e um numero", status: 400});
            }
            if(!this.verificaStatus(Number(status))){
                return resposta.status(400).json({mensagem: 'Status do campo invalido', status: '400'});
            }

            const novoBairro = await criarNovoBairro.criarBairro({codigoMunicipio, nome, status}, requisicao, resposta);
            return novoBairro;

        }catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: '500', error});
        }
        
    }

    public async listarBairro(requisicao: Request, resposta: Response){
        try{    
            const listarBairro = new ListarBairro(this.repositorios);
            const bairro = await listarBairro.listarBairro(requisicao, resposta);
            return bairro;
        }catch(erro){
            return resposta.status(500).json({mensagem: 'Erro interno no servidor', status:'500'});
        }
    }  

    public async atualizarBairro(requisicao: Request, resposta: Response){
        
        try{
            const{codigoBairro, nome, status} = requisicao.body;
            const atualizar = new AtualizarBairro(this.repositorios);
        
            if(!this.verificaStatus(Number(status))){
                return resposta.status(400).json({mensagem: 'Status do campo invalido', status: '400'});
            }
            if(!Number(status)){
                return resposta.status(400).json({mensagem: "Status nao e um numero", status: 400});
            }
            const bairro = await atualizar.atualizarBairro({codigoBairro, nome, status}, requisicao, resposta);
            return bairro;

        }catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: '500', error});
        }
    }

    public async deletarBairro(requisicao: Request, resposta: Response){
        try{
            const {codigoBairro} = requisicao.params;
            const deletarPeloId = new DeletarBairro(this.repositorios);
            const deletado = await deletarPeloId.deletarBairro({codigoBairro: Number(codigoBairro)}, requisicao, resposta);
            return deletado;
        }catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: '500', error});
        }
    }

    private verificaStatus(status: number){
        if(status === 1 || status === 2){
            return true;
        }
        return false;
    }
}