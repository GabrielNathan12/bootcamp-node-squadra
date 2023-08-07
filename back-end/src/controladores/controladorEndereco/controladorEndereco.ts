import {  Request, Response } from "express-serve-static-core";
import { IRepositorios } from "../../Irepositorios/Irepositorios";
import { ListaEndereco } from "./servicos/operacoes/ListarEndereco";
import { CriarEndereco } from "./servicos/operacoes/CriarEndereco";
import { AtualizarEndereco } from "./servicos/operacoes/AtualizarEndereco";
import { DeletarEndereco } from "./servicos/operacoes/DeletarEndereco";

export class ControladorEndereco{
    private repositorio: IRepositorios;

    constructor(repositorios: IRepositorios) {
        this.repositorio = repositorios;
    }
    public async listarEndereco(requisicao: Request, resposta: Response){
        try{
            const listaEndereco =  new ListaEndereco(this.repositorio);
            await listaEndereco.litaEndereco(requisicao, resposta);
            
        }catch(error){
             return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: 500, error});
        }
    }
    public async criarEndereco(requisicao: Request, resposta: Response){
          try{
            const {codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep, status} = requisicao.body;
            
            const criarNovoEndereco = new CriarEndereco(this.repositorio);

            await criarNovoEndereco.criarEndereco({codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep, status}, requisicao, resposta);
           


        }catch(error){
             return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: 500, error});
        }
    }
    public async atualizarEndereco(requisicao: Request, resposta: Response){
        try{
            const {codigoEndereco,codigoBairro, codigoPessoa , nomeRua, numero, complemento, cep} = requisicao.body;
            const atualizar = new AtualizarEndereco(this.repositorio);

            await atualizar.atualizarEndereco({codigoEndereco,codigoBairro, codigoPessoa, nomeRua, numero, complemento, cep}, requisicao, resposta);
          
        }catch(error){
             return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: 500, error});
        }
    }
    public async deletarEndereco(requisicao: Request, resposta: Response){
        try{
            const {codigoEndereco} = requisicao.params;
            const deletarPeloId = new DeletarEndereco(this.repositorio);
            await deletarPeloId.deletarEndereco({codigoEndereco: Number(codigoEndereco)}, requisicao, resposta);
        }catch(error){
             return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: 500, error});
        }
    }
    
}