import {  Request, Response } from "express-serve-static-core";
import { IRepositorios } from "../../Irepositorios/Irepositorios";
import { ListaEndereco } from "./servicos/ListarEndereco";
import { CriarEndereco } from "./servicos/CriarEndereco";
import { AtualizarEndereco } from "./servicos/AtualizarEndereco";
import { DeletarEndereco } from "./servicos/DeletarEndereco";

export class ControladorEndereco{
    private repositorio: IRepositorios;

    constructor(repositorios: IRepositorios) {
        this.repositorio = repositorios;
    }
    public async listarEndereco(requisicao: Request, resposta: Response){
        try{
            const listaEndereco =  new ListaEndereco(this.repositorio);
            const endereco = await listaEndereco.litaEndereco(requisicao, resposta);
            return endereco;
        }catch(error){
             return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: '500', error});
        }
    }
    public async criarEndereco(requisicao: Request, resposta: Response){
          try{
            const {codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep, status} = requisicao.body;
            
            const criarNovoEndereco = new CriarEndereco(this.repositorio);

            if(codigoPessoa === undefined || codigoBairro === undefined || nomeRua === undefined || numero === undefined || complemento === undefined || cep === undefined|| status === undefined){
                return resposta.status(400).json({mensagem: 'Erro ao ler os dados no Json, falta campos', status: '400'});
            }
            if(!Number(status)){
                return resposta.status(400).json({mensagem: "Status nao e um numero", status: 400});
            }
            if(!this.verificarStatus(Number(status))){
                return resposta.status(400).json({mensagem: 'Status invalido', status: '400'});
            }

            const novoEndereco = await criarNovoEndereco.criarEndereco({codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep, status}, requisicao, resposta);
            return novoEndereco;


        }catch(error){
             return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: '500', error});
        }
    }
    public async atualizarEndereco(requisicao: Request, resposta: Response){
        try{
            const {codigoEndereco, nomeRua, numero, complemento, cep, status} = requisicao.body;
            const atualizar = new AtualizarEndereco(this.repositorio);

            if(!codigoEndereco|| !nomeRua || !numero || !complemento || !cep || !status){
                return resposta.status(400).json({mensagem: 'Erro ao ler os dados no Json, falta campos', status: '400'});
            }
            if(!this.verificarStatus(Number(status))){
                return resposta.status(400).json({mensagem: 'Status do campo invalido', status: '400'});
            }
            const endereco = await atualizar.atualizarEndereco({codigoEndereco, nomeRua, numero, complemento, cep, status}, requisicao, resposta);
            return endereco;
        }catch(error){
             return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: '500', error});
        }
    }
    public async deletarEndereco(requisicao: Request, resposta: Response){
        try{
            const {codigoEndereco} = requisicao.params;
            const deletarPeloId = new DeletarEndereco(this.repositorio);
            const deletado = await deletarPeloId.deletarEndereco({codigoEndereco: Number(codigoEndereco)}, requisicao, resposta);
            return deletado;
        }catch(error){
             return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: '500', error});
        }
    }

    private verificarStatus(status: Number){
        if(status === 1 || status === 2){
            return true;
        }
        return false;
    }
    
}