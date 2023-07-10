import { Request, Response } from "express-serve-static-core";
import { IRepositorios } from "../../Irepositorios/Irepositorios";
import { ListarUFs } from "./servicos/ListarUFs";
import { CriarUF } from "./servicos/CriarUF";
import { AtualizarUF } from "./servicos/AtualizarUF";
import { DeletarUF } from "./servicos/DeletarUF";


export class ControladorUF{
    private repositorios: IRepositorios;

    constructor(repositorio: IRepositorios){
        this.repositorios = repositorio;
    }

    public async litarUF(requisicao: Request, resposta: Response){
        try{

            const listaUf = new ListarUFs(this.repositorios);
            
            const ufs = await listaUf.listarUf(requisicao, resposta);
    
            return ufs;
            
        }catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: '500', error});
        }
       
    }

    public async criarUf(requisicao: Request, resposta: Response){
        try{
            const {nome, sigla, status} = requisicao.body;

            if(nome === undefined || sigla === undefined || status === undefined){
                return resposta.status(400).json({mensagem: 'Erro ao encontrar dados no Json', status: '400'})
            }
            if(!this.verificaQtdSiglas(sigla)){
                return resposta.status(400).json({mensagem: 'Sigla invalida', status: '400'});
            }
            
            if(!this.verificaStatus(Number(status))){
                return resposta.status(400).json({mensagem: 'Status do campo invalido', status: '400'});
            }

            const criarUF = new CriarUF(this.repositorios);
            const uf = await criarUF.criarNovoUF({nome,sigla, status}, requisicao, resposta);
        
            return uf;
        }catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: '500', error});
        }
    }

    public async atualizarUf(requisicao: Request, resposta: Response){
        try{
            const {codigoUF ,nome, sigla, status} = requisicao.body;
            const atualizarUF = new AtualizarUF(this.repositorios);
            
            if(!this.verificaQtdSiglas(sigla)){
                return resposta.status(400).json({mensagem: 'Sigla invalida', status: '400'});
            }
            if(!this.verificaStatus(Number(status))){
                return resposta.status(400).json({mensagem: 'Status do campo invalido', status: '400'});
            }
            const uf = await atualizarUF.atualizarUf({codigoUF, nome, sigla, status}, requisicao, resposta);
            
            return uf;
        }catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: '500', error});
        }
    }

    public async deletarUf(requisicao: Request, resposta: Response){
        try{
            const {codigoUF} = requisicao.params;
            const deletarPeloId = new DeletarUF(this.repositorios);
            const deletado = await deletarPeloId.deletarUF({codigoUF:Number(codigoUF)}, resposta)

            return deletado;
        }catch(error){
            return resposta.status(500).json({mensagem: 'Erro interno no Servidor', status: '500', error});
        }
    }

    private verificaQtdSiglas(sigla: String){
        if(sigla.length === 2){
            return true;
        }
        return false;
    }

    private verificaStatus(status: number){
        if(status === 0 || status === 1){
            return true;
        }
        return false;
    }

}