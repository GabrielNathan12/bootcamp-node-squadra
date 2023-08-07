import {Request, Response } from "express-serve-static-core";
import { IRepositorios } from "../../Irepositorios/Irepositorios";
import { CriarBairro } from "./servicos/operacoes/CriarBairro";
import { ListarBairro } from "./servicos/operacoes/ListarBairro";
import { AtualizarBairro } from "./servicos/operacoes/AtualizarBairro";
import { DeletarBairro } from "./servicos/operacoes/DeletarBairro";

export class ControladorBairro{
    private repositorios: IRepositorios;
    
    constructor(repositorio: IRepositorios){
        this.repositorios = repositorio;
    }

    public async criarBairro(requisicao: Request, resposta: Response){
        try{
            const {codigoMunicipio, nome, status} = requisicao.body;
            const criarNovoBairro = new CriarBairro(this.repositorios);

            await criarNovoBairro.criarBairro({codigoMunicipio, nome, status}, requisicao, resposta);
            
        }
        catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: 500, error});
        }
        
    }

    public async listarBairro(requisicao: Request, resposta: Response){
        try{    
            const listarBairro = new ListarBairro(this.repositorios);
            await listarBairro.listarBairro(requisicao, resposta);
            
        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro interno no servidor', status: 500});
        }
    }  

    public async atualizarBairro(requisicao: Request, resposta: Response){
        
        try{
            const{codigoBairro,codigoMunicipio ,nome, status} = requisicao.body;
            const atualizar = new AtualizarBairro(this.repositorios);

            await atualizar.atualizarBairro({codigoBairro, codigoMunicipio,nome, status}, requisicao, resposta);

        }
        catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: 500, error});
        }
    }

    public async deletarBairro(requisicao: Request, resposta: Response){
        try{
            const {codigoBairro} = requisicao.params;
            const deletarPeloId = new DeletarBairro(this.repositorios);
            await deletarPeloId.deletarBairro({codigoBairro: Number(codigoBairro)}, requisicao, resposta);
        }
        catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: 500, error});
        }
    }


}