import { Request, Response } from "express-serve-static-core";
import { IRepositorios } from "../../Irepositorios/Irepositorios";
import { CriarPessoa } from "./servicos/CriarPessoa";
import { ListarPessoa } from "./servicos/ListarPessoa";
import { DeletarPessoa } from "./servicos/DeletarPessoa";
import { AtualizarPessoa } from "./servicos/AtualizarPessoa";

export class ControladorPessoa {
   private repositorios: IRepositorios;

   constructor(repositorio: IRepositorios) {
        this.repositorios = repositorio;
   }

   public async criarPessoa(requisicao:Request, resposta: Response){
        try{
            
            const {nome, sobrenome, idade, login , senha, status} = requisicao.body;
            const criarNovaPessoa = new CriarPessoa(this.repositorios);

            if(!nome || !sobrenome || !idade || !login || !senha || !status){
                return resposta.status(400).json({mensagem: 'Erro ao encontrar dados no Json', status:'400'})
            }
            if(!this.verificarStatus(Number(status))){
                return resposta.status(400).json({mensagem: 'Status do campo invalido', status: '400'});
            }
            const novaPessoa = await criarNovaPessoa.criarPessoa({nome, sobrenome, idade, login , senha, status}, requisicao, resposta);
            
            return novaPessoa;

        }catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: '500', error});
        }
   }

   public async listarPessoa(requisicao: Request, resposta: Response){
    try{
       
        const litarPessoa = new ListarPessoa(this.repositorios);
        const pessoas = await litarPessoa.listarPessoas(requisicao, resposta);
        return pessoas;

    }catch(error){
        return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: '500', error});
    }
   }
   public async deletarPessoa(requisicao: Request, resposta: Response){
    try{
        const {codigoPessoa} = requisicao.params;
        const deletarPeloId = new DeletarPessoa(this.repositorios);
        const deletado = await deletarPeloId.deletarPessoa({codigoPessoa: Number(codigoPessoa)}, requisicao, resposta);
        return deletado;
    }catch(error){
        return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: '500', error});
    }
   }
   public async atualizarPessoa(requisicao: Request, resposta: Response){
    try{
        const {codigoPessoa, nome, sobrenome, idade, login, senha, status} = requisicao.body;

        if(!codigoPessoa || !nome || !sobrenome || !idade || !login || !senha || !status){
            return resposta.status(400).json({mensagem: 'Erro ao encontrar dados do Json', status: '400'});
        }
        if(!this.verificarStatus(Number(status))){
            return resposta.status(400).json({mensagem: 'Status invalido', status: '400'});
        }
        const atualizar = new AtualizarPessoa(this.repositorios);
        const pessoa = atualizar.atualizarPessoa({codigoPessoa, nome, sobrenome, idade, login, senha, status}, requisicao, resposta);
        return pessoa;
        
    }catch(error){
        return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: '500', error});
    }
   }
   private verificarStatus(status: number){
        if(status == 0 || status == 1){
            return true;
        }
        return false;
   }
}