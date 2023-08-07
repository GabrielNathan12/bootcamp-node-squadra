import { Request, Response } from "express-serve-static-core";
import { IRepositorios } from "../../Irepositorios/Irepositorios";
import { CriarPessoa } from "./servicos/operacoes/CriarPessoa";
import { ListarPessoa } from "./servicos/operacoes/ListarPessoa";
import { DeletarPessoa } from "./servicos/operacoes/DeletarPessoa";
import { AtualizarPessoa } from "./servicos/operacoes/AtualizarPessoa";

export class ControladorPessoa {
   private repositorios: IRepositorios;

   constructor(repositorio: IRepositorios) {
        this.repositorios = repositorio;
   }

   public async criarPessoa(requisicao:Request, resposta: Response){
        try{
            const {nome, sobrenome, idade, login , senha, status,enderecos} = requisicao.body;
            
            const criarNovaPessoa = new CriarPessoa(this.repositorios);

            await criarNovaPessoa.criarPessoa({nome, sobrenome, idade, login , senha, status, enderecos}, requisicao, resposta);

        }
        catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: '500', error});
        }
   }

    public async listarPessoa(requisicao: Request, resposta: Response){
        try{
            const litarPessoa = new ListarPessoa(this.repositorios);
            await litarPessoa.listarPessoas(requisicao, resposta);
        }
        catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: '500', error});
        }
   }

   public async deletarPessoa(requisicao: Request, resposta: Response){
        try{
            const {codigoPessoa} = requisicao.params;
            const deletarPeloId = new DeletarPessoa(this.repositorios);
            const deletado = await deletarPeloId.deletarPessoa({codigoPessoa: Number(codigoPessoa)}, requisicao, resposta);
            return deletado;
        }
        catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: '500', error});
        }
   }

   public async atualizarPessoa(requisicao: Request, resposta: Response){
        try{
            const {codigoPessoa ,nome, sobrenome, idade, login , senha, status,enderecos} = requisicao.body;

            const atualizar = new AtualizarPessoa(this.repositorios);
            
            atualizar.atualizarPessoa({codigoPessoa, nome, sobrenome, idade, login, senha, status,enderecos}, requisicao, resposta);
        }
        catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: '500', error});
        }
   }
}