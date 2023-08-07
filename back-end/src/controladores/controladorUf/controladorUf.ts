import { Request, Response } from "express-serve-static-core";
import { IRepositorios } from "../../Irepositorios/Irepositorios";
import { ListarUFs } from "./servicos/operacoes/ListarUFs";
import { CriarUF } from "./servicos/operacoes/CriarUF";
import { AtualizarUF } from "./servicos/operacoes/AtualizarUF";
import { DeletarUF } from "./servicos/operacoes/DeletarUF";


export class ControladorUF{
    private repositorios: IRepositorios;

    constructor(repositorio: IRepositorios){
        this.repositorios = repositorio;
    }

    public async litarUF(requisicao: Request, resposta: Response){
        try{
            const listaUf = new ListarUFs(this.repositorios);
            
            await listaUf.listarUf(requisicao, resposta);
            
        }
        catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: 500, error});
        }
       
    }

    public async criarUf(requisicao: Request, resposta: Response){
        try{
           const {nome, sigla, status} = requisicao.body;
           const servicos = new CriarUF(this.repositorios);
           await servicos.criarNovoUF({nome, sigla, status}, requisicao, resposta);
        }
        catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: 500, error});
        }
    }

    public async atualizarUf(requisicao: Request, resposta: Response){
        try{
            const {codigoUF ,nome, sigla, status} = requisicao.body;
            const servicos = new AtualizarUF(this.repositorios);
            
            await servicos.atualizarUf({codigoUF, nome, sigla, status}, requisicao, resposta);
            
        }catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: 500, error});
        }
    }

    public async deletarUf(requisicao: Request, resposta: Response){
        try{
            const {codigoUF} = requisicao.params;
            const deletarPeloId = new DeletarUF(this.repositorios);
            const deletado = await deletarPeloId.deletarUF({codigoUF:Number(codigoUF)}, resposta)

            return deletado;
        }catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: 500, error});
        }
    }

}